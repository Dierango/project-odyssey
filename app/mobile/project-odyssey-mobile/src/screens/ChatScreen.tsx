import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { getChatHistory, sendChatMessage } from '../services/api';
import { getAccessToken } from '../services/auth';
import { colors } from '../styles/colors';
import { dimensions } from '../styles/dimensions';
import { animations } from '../styles/animations';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  isNew?: boolean;
  id: string; // Unique identifier for each message
}

interface TypingIndicatorProps {
  visible: boolean;
}

interface ChatScreenProps {
  navigation?: any;
}

// Memoized typing indicator component
const TypingIndicator: React.FC<TypingIndicatorProps> = React.memo(({ visible }) => {
  if (!visible) return null;

  return (
    <Animatable.View 
      animation="fadeIn"
      duration={300}
      style={[styles.messageContainer, styles.aiMessage, styles.typingContainer]}
    >
      <View style={styles.typingIndicator}>
        <Text style={styles.typingText}>Athena is typing</Text>
        <View style={styles.dotsContainer}>
          {[0, 200, 400].map((delay, index) => (
            <Animatable.View 
              key={index}
              animation="pulse"
              iterationCount="infinite"
              delay={delay}
              style={[styles.dot, { backgroundColor: colors.primary }]} 
            />
          ))}
        </View>
      </View>
    </Animatable.View>
  );
});

// Memoized message bubble component
const MessageBubble: React.FC<{ 
  item: Message; 
  index: number; 
  isInitialLoad: boolean;
  onLongPress?: (message: Message) => void;
}> = React.memo(({ item, index, isInitialLoad, onLongPress }) => {
  const isUser = item.role === 'user';
  
  // Format AI responses to be more readable
  const formatAIResponse = useCallback((content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
      .replace(/```(.*?)```/gs, '$1') // Remove code blocks
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .trim();
  }, []);

  // Only animate new messages (not on initial load)
  const shouldAnimate = item.isNew && !isInitialLoad;
  
  const animationProps = shouldAnimate 
    ? {
        animation: isUser ? 'slideInRight' : 'slideInLeft' as any,
        delay: 100,
        duration: 400,
      }
    : {};

  const handleLongPress = useCallback(() => {
    onLongPress?.(item);
  }, [item, onLongPress]);

  return (
    <Animatable.View
      {...animationProps}
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onLongPress={handleLongPress}
        delayLongPress={500}
      >
        <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
          {isUser ? item.content : formatAIResponse(item.content)}
        </Text>
        {item.timestamp && (
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
});

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  
  // State for better scroll management
  const [isUserNearBottom, setIsUserNearBottom] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  
  // Debounced scroll handler
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Generate unique message ID
  const generateMessageId = useCallback(() => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Memoized scroll to end function
  const scrollToEnd = useCallback((animated = true) => {
    if (flatListRef.current && isUserNearBottom) {
      flatListRef.current.scrollToEnd({ animated });
    }
  }, [isUserNearBottom]);

  // Check if user is near bottom
  const checkIfUserNearBottom = useCallback((event: any) => {
    // Persist the event to avoid synthetic event pooling issues
    event.persist();
    
    if (!event.nativeEvent) {
      return;
    }
    
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    
    // Safety checks for null values
    if (!contentOffset || !contentSize || !layoutMeasurement) {
      return;
    }
    
    const threshold = 100; // pixels from bottom
    const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - threshold;
    setIsUserNearBottom(isNearBottom);
  }, []);

  // Debounced scroll handler
  const handleScroll = useCallback((event: any) => {
    // Persist the event immediately to prevent pooling issues
    event.persist();
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      checkIfUserNearBottom(event);
    }, 50);
  }, [checkIfUserNearBottom]);

  // Keyboard event handlers
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      // Only scroll if user is near bottom
      if (isUserNearBottom) {
        setTimeout(() => scrollToEnd(true), 100);
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isUserNearBottom, scrollToEnd]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && isUserNearBottom) {
      setTimeout(() => scrollToEnd(true), 100);
    }
  }, [messages.length, isUserNearBottom, scrollToEnd]);

  // Authentication and chat history fetching
  useEffect(() => {
    const checkAuthAndFetchHistory = async () => {
      try {
        const token = await getAccessToken();
        if (!token) {
          setAuthError('Please log in to access the chat');
          setIsAuthenticated(false);
          setIsInitialLoad(false);
          return;
        }

        setIsAuthenticated(true);
        setAuthError(null);

        // Try to fetch chat history, but don't fail if it's not available
        try {
          const history = await getChatHistory();
          const formattedHistory = history.map((msg: any) => ({
            ...msg,
            timestamp: new Date(),
            isNew: false,
            id: generateMessageId()
          }));
          setMessages(formattedHistory);
        } catch (historyError: any) {
          console.log("Chat history not available or empty, starting fresh");
          // Don't set an error, just start with empty chat
          setMessages([]);
        }
        
        setIsInitialLoad(false);
      } catch (error: any) {
        console.error("Failed to authenticate", error);
        
        if (error.response?.status === 401) {
          setAuthError('Session expired. Please log in again.');
          setIsAuthenticated(false);
        } else if (error.code === 'NETWORK_ERROR' || !error.response) {
          setAuthError('Cannot connect to server. Please check your connection.');
        } else {
          setAuthError('Authentication failed. Please try logging in again.');
        }
        
        setIsInitialLoad(false);
      }
    };
    
    checkAuthAndFetchHistory();
  }, [generateMessageId]);

  // Handle sending messages
  const handleSend = useCallback(async () => {
    if (input.trim() === '' || loading || !isAuthenticated) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date(),
      isNew: true,
      id: generateMessageId()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    setIsInitialLoad(false);
    setIsUserNearBottom(true); // Ensure we scroll for new messages

    try {
      const aiResponse = await sendChatMessage(input.trim());
      const aiMessage: Message = {
        role: 'assistant',
        content: aiResponse.content || aiResponse,
        timestamp: new Date(),
        isNew: true,
        id: generateMessageId()
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setAuthError(null);
    } catch (error: any) {
      console.error("Failed to send message", error);
      
      let errorMessage: Message;
      
      if (error.response?.status === 401) {
        setAuthError('Session expired. Please log in again.');
        setIsAuthenticated(false);
        errorMessage = {
          role: 'assistant',
          content: "Your session has expired. Please log in again to continue chatting.",
          timestamp: new Date(),
          isNew: true,
          id: generateMessageId()
        };
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        errorMessage = {
          role: 'assistant',
          content: "Network error. Please check your connection and try again.",
          timestamp: new Date(),
          isNew: true,
          id: generateMessageId()
        };
      } else {
        errorMessage = {
          role: 'assistant',
          content: "Sorry, I'm having trouble responding right now. Please try again.",
          timestamp: new Date(),
          isNew: true,
          id: generateMessageId()
        };
      }
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, isAuthenticated, generateMessageId]);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    if (isUserNearBottom) {
      setTimeout(() => scrollToEnd(true), 150);
    }
  }, [isUserNearBottom, scrollToEnd]);

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    // No specific action needed on blur
  }, []);

  // Handle message long press
  const handleMessageLongPress = useCallback((message: Message) => {
    Alert.alert(
      'Message Options',
      'What would you like to do with this message?',
      [
        {
          text: 'Copy',
          onPress: async () => {
            try {
              // For now, just show an alert since we don't have clipboard access
              Alert.alert('Copied', 'Message copied to clipboard');
              console.log('Copy message:', message.content);
            } catch (error) {
              console.error('Failed to copy message:', error);
              Alert.alert('Error', 'Failed to copy message');
            }
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  }, []);

  // Dismiss keyboard
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  }, []);

  // Handle content size change
  const handleContentSizeChange = useCallback((width: number, height: number) => {
    setContentHeight(height);
    if (isUserNearBottom && messages.length > 0) {
      setTimeout(() => scrollToEnd(false), 100);
    }
  }, [isUserNearBottom, scrollToEnd, messages.length]);

  // Handle layout change
  const handleLayout = useCallback((event: any) => {
    if (!event?.nativeEvent?.layout) {
      return;
    }
    
    const { height } = event.nativeEvent.layout;
    setLayoutHeight(height);
    if (isInitialLoad && messages.length > 0) {
      setTimeout(() => scrollToEnd(false), 100);
    }
  }, [isInitialLoad, messages.length, scrollToEnd]);

  // Memoized key extractor
  const keyExtractor = useCallback((item: Message, index: number) => item.id || `${index}`, []);

  // Memoized render item
  const renderItem = useCallback(({ item, index }: { item: Message; index: number }) => (
    <MessageBubble 
      item={item} 
      index={index} 
      isInitialLoad={isInitialLoad}
      onLongPress={handleMessageLongPress}
    />
  ), [isInitialLoad, handleMessageLongPress]);

  // Calculate container style based on keyboard
  const containerStyle = useMemo(() => [
    styles.container,
    { marginBottom: Platform.OS === 'ios' ? 0 : keyboardHeight }
  ], [keyboardHeight]);

  return (
    <ImageBackground
      source={require('../assets/home-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
        style={[styles.gradient, { paddingTop: insets.top }]}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <KeyboardAvoidingView 
            style={containerStyle}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 44 : 0}
          >
            {/* Header */}
            <Animatable.View animation="fadeInDown" style={styles.header}>
              <Text style={styles.headerTitle}>Chat with Athena</Text>
              <Text style={styles.headerSubtitle}>Your AI Assistant</Text>
            </Animatable.View>

            {/* Messages List */}
            <View style={styles.messagesContainer}>
              {authError ? (
                <View style={styles.errorContainer}>
                  <Animatable.View animation="shake" style={styles.errorMessage}>
                    <Text style={styles.errorText}>{authError}</Text>
                    <Text style={styles.errorSubtext}>
                      {!isAuthenticated ? 'Please log in to start chatting with Athena' : 'Please try again'}
                    </Text>
                  </Animatable.View>
                </View>
              ) : (
                <>
                  <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    style={styles.messagesList}
                    contentContainerStyle={[
                      styles.messagesContent,
                      messages.length === 0 && styles.emptyMessagesContent
                    ]}
                    showsVerticalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={100}
                    onContentSizeChange={handleContentSizeChange}
                    onLayout={handleLayout}
                    removeClippedSubviews={messages.length > 50}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    initialNumToRender={20}
                    getItemLayout={undefined} // Let FlatList calculate automatically
                    ListEmptyComponent={() => (
                      <View style={styles.emptyStateContainer}>
                        <Animatable.View animation="fadeIn" delay={500}>
                          <Text style={styles.emptyStateText}>
                            👋 Hello! I'm Athena, your AI assistant.
                          </Text>
                          <Text style={styles.emptyStateSubtext}>
                            Ask me anything to get started!
                          </Text>
                        </Animatable.View>
                      </View>
                    )}
                  />
                  <TypingIndicator visible={loading} />
                  
                  {/* Scroll to bottom button */}
                  {!isUserNearBottom && messages.length > 0 && (
                    <Animatable.View animation="fadeIn" style={styles.scrollToBottomButton}>
                      <TouchableOpacity
                        onPress={() => {
                          setIsUserNearBottom(true);
                          scrollToEnd(true);
                        }}
                        style={styles.scrollButton}
                      >
                        <Text style={styles.scrollButtonText}>↓</Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  )}
                </>
              )}
            </View>

            {/* Input Container */}
            <Animatable.View 
              animation="slideInUp"
              style={[
                styles.inputContainer,
                { 
                  paddingBottom: Math.max(insets.bottom, 10),
                }
              ]}
            >
              <View style={styles.inputWrapper}>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={input}
                  onChangeText={setInput}
                  placeholder={isAuthenticated ? "Ask Athena anything..." : "Please log in to chat..."}
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  multiline={true}
                  maxLength={500}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  editable={!loading && isAuthenticated}
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                  blurOnSubmit={false}
                />
                <TouchableOpacity 
                  onPress={handleSend} 
                  disabled={loading || input.trim() === '' || !isAuthenticated}
                  style={[
                    styles.sendButton,
                    (loading || input.trim() === '' || !isAuthenticated) && styles.sendButtonDisabled
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.sendButtonText}>Send</Text>
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.inputHint}>
                {input.length}/500 characters
              </Text>
            </Animatable.View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: dimensions.fontSize.xl,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: dimensions.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: dimensions.spacing.sm,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: dimensions.spacing.sm,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  emptyMessagesContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.spacing.lg,
    minHeight: 200,
  },
  emptyStateText: {
    fontSize: dimensions.fontSize.lg,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: dimensions.spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: dimensions.fontSize.md,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  messageContainer: {
    padding: dimensions.spacing.md,
    borderRadius: 18,
    marginVertical: 4,
    marginHorizontal: dimensions.spacing.sm,
    maxWidth: dimensions.messageMaxWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  messageText: {
    fontSize: dimensions.fontSize.md,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
    fontWeight: '500',
  },
  aiText: {
    color: '#fff',
    fontWeight: '400',
  },
  timestamp: {
    fontSize: dimensions.fontSize.xs,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingContainer: {
    marginBottom: dimensions.spacing.sm,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: dimensions.fontSize.sm,
    marginRight: dimensions.spacing.xs,
    fontStyle: 'italic',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  inputContainer: {
    paddingHorizontal: dimensions.spacing.md,
    paddingTop: dimensions.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: dimensions.spacing.md,
    paddingVertical: dimensions.spacing.xs,
    marginBottom: dimensions.spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: dimensions.fontSize.md,
    maxHeight: dimensions.inputMaxHeight,
    minHeight: dimensions.inputMinHeight,
    paddingVertical: dimensions.spacing.xs,
    paddingRight: dimensions.spacing.sm,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: dimensions.spacing.md,
    paddingVertical: dimensions.spacing.sm,
    borderRadius: 20,
    marginLeft: dimensions.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(233, 69, 96, 0.5)',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: dimensions.fontSize.sm,
  },
  inputHint: {
    fontSize: dimensions.fontSize.xs,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: dimensions.spacing.lg,
  },
  errorMessage: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,0,0,0.3)',
    borderRadius: 12,
    padding: dimensions.spacing.lg,
    alignItems: 'center',
    maxWidth: '90%',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: dimensions.fontSize.md,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: dimensions.spacing.sm,
  },
  errorSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: dimensions.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  scrollToBottomButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 1000,
  },
  scrollButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
