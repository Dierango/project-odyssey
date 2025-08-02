import React, { useState, useEffect, useRef } from 'react';
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
  TouchableWithoutFeedback
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { getChatHistory, sendChatMessage } from '../services/api';
import { getAccessToken } from '../services/auth';
import { colors } from '../styles/colors';
import { dimensions } from '../styles/dimensions';
import { animations } from '../styles/animations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  isNew?: boolean; // Track if this is a newly added message
}

interface TypingIndicatorProps {
  visible: boolean;
}

interface ChatScreenProps {
  navigation?: any;
}

// Custom typing indicator component with animated dots
const TypingIndicator: React.FC<TypingIndicatorProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <Animatable.View 
      {...animations.messageFadeIn}
      style={[styles.messageContainer, styles.aiMessage, styles.typingContainer]}
    >
      <View style={styles.typingIndicator}>
        <Text style={styles.typingText}>Athena is typing</Text>
        <View style={styles.dotsContainer}>
          <Animatable.View 
            {...animations.typingPulse}
            delay={0}
            style={[styles.dot, { backgroundColor: colors.primary }]} 
          />
          <Animatable.View 
            {...animations.typingPulse}
            delay={200}
            style={[styles.dot, { backgroundColor: colors.primary }]} 
          />
          <Animatable.View 
            {...animations.typingPulse}
            delay={400}
            style={[styles.dot, { backgroundColor: colors.primary }]} 
          />
        </View>
      </View>
    </Animatable.View>
  );
};

// Enhanced message rendering with better formatting
const MessageBubble: React.FC<{ item: Message; index: number; isInitialLoad: boolean }> = ({ item, index, isInitialLoad }) => {
  const isUser = item.role === 'user';
  
  // Format AI responses to be more readable
  const formatAIResponse = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
      .replace(/```(.*?)```/gs, '$1') // Remove code blocks
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .trim();
  };

  // Only animate new messages (not on initial load)
  const shouldAnimate = item.isNew && !isInitialLoad;
  
  const animationProps = shouldAnimate 
    ? {
        animation: isUser ? 'slideInRight' : 'slideInLeft',
        delay: 100,
        duration: 400,
      }
    : {};

  return (
    <Animatable.View
      {...animationProps}
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>
        {isUser ? item.content : formatAIResponse(item.content)}
      </Text>
      {item.timestamp && (
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      )}
    </Animatable.View>
  );
};

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

  useEffect(() => {
    const checkAuthAndFetchHistory = async () => {
      try {
        // Check if user is authenticated
        const token = await getAccessToken();
        if (!token) {
          setAuthError('Please log in to access the chat');
          setIsAuthenticated(false);
          setIsInitialLoad(false);
          return;
        }

        setIsAuthenticated(true);
        setAuthError(null);

        // Fetch chat history if authenticated
        const history = await getChatHistory();
        const formattedHistory = history.map((msg: any) => ({
          ...msg,
          timestamp: new Date(),
          isNew: false // Mark existing messages as not new
        }));
        setMessages(formattedHistory);
        setIsInitialLoad(false); // Mark that initial load is complete
      } catch (error: any) {
        console.error("Failed to fetch chat history", error);
        
        // Handle different types of errors
        if (error.response?.status === 401) {
          setAuthError('Session expired. Please log in again.');
          setIsAuthenticated(false);
        } else if (error.code === 'NETWORK_ERROR' || !error.response) {
          setAuthError('Cannot connect to server. Please check your connection.');
        } else {
          setAuthError('Failed to load chat history. Please try again.');
        }
        
        setIsInitialLoad(false); // Still mark as complete even if failed
      }
    };
    
    checkAuthAndFetchHistory();
  }, []);

  useEffect(() => {
    // Add keyboard listeners for scrolling behavior only
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      // Scroll to bottom when keyboard appears
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // Scroll to bottom when keyboard hides
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (input.trim() === '' || loading || !isAuthenticated) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date(),
      isNew: true // Mark as new message for animation
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);
    setIsInitialLoad(false); // Ensure new messages are animated

    try {
      const aiResponse = await sendChatMessage(input.trim());
      const aiMessage: Message = {
        role: 'assistant',
        content: aiResponse.content || aiResponse,
        timestamp: new Date(),
        isNew: true // Mark as new message for animation
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
      setAuthError(null); // Clear any previous auth errors on successful request
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
          isNew: true
        };
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        errorMessage = {
          role: 'assistant',
          content: "Network error. Please check your connection and try again.",
          timestamp: new Date(),
          isNew: true
        };
      } else {
        errorMessage = {
          role: 'assistant',
          content: "Sorry, I'm having trouble responding right now. Please try again.",
          timestamp: new Date(),
          isNew: true
        };
      }
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputFocus = () => {
    // Let KeyboardAvoidingView handle the positioning
    // Just ensure we scroll to bottom to show the latest messages
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const handleInputBlur = () => {
    // Let KeyboardAvoidingView handle the positioning automatically
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  };

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
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 60 : 0}
            enabled={true}
          >
          {/* Header */}
          <Animatable.View {...animations.headerFadeIn} style={styles.header}>
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
                  keyExtractor={(item, index) => `${index}-${item.timestamp?.getTime()}`}
                  renderItem={({ item, index }) => <MessageBubble item={item} index={index} isInitialLoad={isInitialLoad} />}
                  style={styles.messagesList}
                  contentContainerStyle={styles.messagesContent}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={() => {
                    setTimeout(() => {
                      flatListRef.current?.scrollToEnd({ animated: true });
                    }, 100);
                  }}
                  onLayout={() => {
                    setTimeout(() => {
                      flatListRef.current?.scrollToEnd({ animated: false });
                    }, 100);
                  }}
                />
                <TypingIndicator visible={loading} />
              </>
            )}
          </View>

          {/* Input Container */}
          <Animatable.View 
            {...animations.inputSlideUp}
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
                  <Animatable.Text 
                    {...(input.trim() ? animations.buttonPulse : {})}
                    style={styles.sendButtonText}
                  >
                    Send
                  </Animatable.Text>
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
});

export default ChatScreen;
