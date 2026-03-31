// components/AIStudyAssistant.jsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Send, Sparkles, X, Minimize2, Maximize2, 
  Volume2, VolumeX, Copy, Check, ThumbsUp, ThumbsDown,
  Zap, Brain, Lightbulb, MessageCircle, Star, Clock
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

// Message Bubble Component
const MessageBubble = ({ message, isUser, timestamp, onCopy, onLike, onDislike }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format timestamp safely
  const formattedTime = timestamp instanceof Date 
    ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Avatar/Icon */}
        <div className={`flex items-center gap-2 mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {!isUser && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
          )}
          <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            {formattedTime}
          </span>
          {isUser && (
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-white text-xs">👤</span>
            </div>
          )}
        </div>
        
        {/* Message Bubble */}
        <div className={`relative group rounded-2xl p-3 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-tr-sm'
            : isDark 
              ? 'bg-gray-800 text-gray-200 rounded-tl-sm'
              : 'bg-white text-gray-800 rounded-tl-sm shadow-sm'
        }`}>
          <p className="text-sm whitespace-pre-wrap break-words">{message}</p>
          
          {/* Message Actions */}
          <div className={`absolute -bottom-8 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
            <button
              onClick={handleCopy}
              className={`p-1 rounded-lg transition-all ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              title="Copy message"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            </button>
            {!isUser && (
              <>
                <button onClick={onLike} className={`p-1 rounded-lg transition-all ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button onClick={onDislike} className={`p-1 rounded-lg transition-all ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Suggested Question Chip
const SuggestedQuestion = ({ question, onClick, isDark }) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(question)}
    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
      isDark
        ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
    }`}
  >
    {question}
  </motion.button>
);

// Quick Action Button
const QuickAction = ({ icon: Icon, label, onClick, color, isDark }) => {
  const colorMap = {
    purple: isDark ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600",
    yellow: isDark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-600",
    blue: isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600",
    green: isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
        isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>{label}</span>
    </motion.button>
  );
};

// Main Component
export default function AIStudyAssistant() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: "bot", 
      content: "Hi! I'm your AI study assistant. How can I help you today? 🎓",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Knowledge base for responses
  const knowledgeBase = {
    greetings: [
      "Hello! How can I assist with your studies today?", 
      "Hi there! Ready to learn something new?", 
      "Hey! What subject can I help you with?"
    ],
    math: [
      "I can help with algebra, geometry, calculus, and more! What specific math topic are you working on?", 
      "Math can be fun! Let me explain the concept you're struggling with.", 
      "Want to practice some math problems? I can generate exercises for you."
    ],
    science: [
      "Physics, Chemistry, Biology - I've got you covered! What science topic are you studying?",
      "Science is fascinating! Let me break down that concept for you.",
      "Would you like me to explain a scientific phenomenon or help with an experiment?"
    ],
    english: [
      "Grammar, vocabulary, writing - I can help with all English topics!",
      "Need help with an essay? I can provide writing tips and feedback.",
      "Let's improve your English skills together!"
    ],
    coding: [
      "Programming languages, algorithms, debugging - I'm here to help!",
      "What programming language are you learning? I can explain concepts and help with code.",
      "Want to see some code examples? I can generate solutions for you."
    ],
    default: [
      "That's a great question! Let me help you understand this better.",
      "I'll explain this in a simple way. Give me a moment...",
      "Interesting! Here's what you need to know about this topic."
    ]
  };
  
  const getAIResponse = async (userQuestion) => {
    const lowerQuestion = userQuestion.toLowerCase();
    
    // Simulate AI response based on keywords
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    
    if (lowerQuestion.includes('math') || lowerQuestion.includes('algebra') || lowerQuestion.includes('calculus')) {
      return knowledgeBase.math[Math.floor(Math.random() * knowledgeBase.math.length)];
    } else if (lowerQuestion.includes('science') || lowerQuestion.includes('physics') || lowerQuestion.includes('chemistry') || lowerQuestion.includes('biology')) {
      return knowledgeBase.science[Math.floor(Math.random() * knowledgeBase.science.length)];
    } else if (lowerQuestion.includes('english') || lowerQuestion.includes('grammar') || lowerQuestion.includes('essay')) {
      return knowledgeBase.english[Math.floor(Math.random() * knowledgeBase.english.length)];
    } else if (lowerQuestion.includes('code') || lowerQuestion.includes('programming') || lowerQuestion.includes('python')) {
      return knowledgeBase.coding[Math.floor(Math.random() * knowledgeBase.coding.length)];
    } else if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    } else {
      return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
    }
  };
  
  const handleSendMessage = async () => {
    if (!question.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsTyping(true);
    
    // Get AI response
    const response = await getAIResponse(question);
    
    // Add bot response
    const botMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: response,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };
  
  const handleSuggestedQuestion = (suggestion) => {
    setQuestion(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };
  
  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
        setTimeout(() => handleSendMessage(), 500);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        alert("Voice recognition failed. Please try again.");
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert("Voice recognition is not supported in your browser.");
    }
  };
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);
  
  const suggestedQuestions = [
    "Explain fractions with examples",
    "How to solve algebra problems?",
    "Tips for remembering formulas",
    "Practice problems for science",
    "Help with English grammar",
    "Introduction to Python"
  ];
  
  const quickActions = [
    { icon: Brain, label: "Explain", color: "purple", action: () => handleSuggestedQuestion("Can you explain this concept?") },
    { icon: Zap, label: "Practice", color: "yellow", action: () => handleSuggestedQuestion("Give me some practice problems") },
    { icon: Lightbulb, label: "Study Tips", color: "blue", action: () => handleSuggestedQuestion("Share some study tips") },
    { icon: Star, label: "Summary", color: "green", action: () => handleSuggestedQuestion("Can you summarize this topic?") }
  ];
  
  // Floating button when chat is closed
  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-green-400 
          text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      >
        <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </motion.button>
    );
  }
  
  // Chat Window
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`fixed bottom-24 right-6 z-50 w-[90vw] sm:w-96 h-[500px] sm:h-[600px] rounded-2xl shadow-2xl overflow-hidden flex flex-col
          ${isDark ? "bg-gray-900" : "bg-white"} border ${isDark ? "border-gray-700" : "border-gray-200"}`}
      >
        {/* Header */}
        <div className={`p-4 bg-gradient-to-r from-blue-500 to-green-400 text-white flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">AI Study Assistant</h3>
              <p className="text-xs opacity-90">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-lg hover:bg-white/20 transition-all"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className={`p-3 border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
              <div className="grid grid-cols-4 gap-1">
                {quickActions.map((action, idx) => (
                  <QuickAction key={idx} {...action} isDark={isDark} />
                ))}
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.content}
                  isUser={msg.type === "user"}
                  timestamp={msg.timestamp}
                  onCopy={() => console.log("Copied")}
                  onLike={() => console.log("Liked")}
                  onDislike={() => console.log("Disliked")}
                />
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className={`rounded-2xl p-3 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested Questions */}
            <div className={`p-3 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
              <p className={`text-xs mb-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((q, i) => (
                  <SuggestedQuestion key={i} question={q} onClick={handleSuggestedQuestion} isDark={isDark} />
                ))}
              </div>
            </div>
            
            {/* Input Area */}
            <div className={`p-3 border-t ${isDark ? "border-gray-800" : "border-gray-100"}`}>
              <div className="flex gap-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-xl transition-all ${
                    isListening 
                      ? "bg-red-500 text-white animate-pulse" 
                      : isDark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isListening ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Ask me anything..."}
                  className={`flex-1 p-2 rounded-xl border transition-all text-sm ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-green-500"
                      : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400 focus:border-green-500"
                  } focus:outline-none focus:ring-2 focus:ring-green-500/20`}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!question.trim()}
                  className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                    hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              {/* AI Tip */}
              <div className="mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-green-500" />
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  Ask specific questions for better answers!
                </p>
              </div>
            </div>
          </>
        )}
        
        {/* Minimized View */}
        {isMinimized && (
          <div className="p-3 text-center">
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              AI Assistant is ready to help
            </p>
            <button
              onClick={() => setIsMinimized(false)}
              className="mt-2 text-xs text-blue-500 hover:text-blue-600"
            >
              Expand to chat →
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}