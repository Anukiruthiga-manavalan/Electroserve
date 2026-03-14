package com.electroserve.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.LinkedHashMap;

@Service
public class ChatbotService {

    private static final Map<String, String> RESPONSES = new LinkedHashMap<>();

    static {
        // Greetings
        RESPONSES.put("hello|hi|hey|good morning|good evening",
                "Hello! 👋 Welcome to ElectroServe. I can help you with:\n• Finding an electrician\n• Booking a service\n• Troubleshooting tips\n• Service pricing\n\nHow can I assist you today?");

        // Booking related
        RESPONSES.put("book|booking|schedule|appointment",
                "To book an electrician:\n1. Go to 'Find Electricians' page\n2. Browse and select an electrician\n3. Click 'Book Now' on their profile\n4. Choose your service, date & time\n5. Confirm your booking!\n\nWould you like me to help with anything else?");

        // Pricing
        RESPONSES.put("price|cost|rate|charge|fee|how much",
                "Here are typical service rates:\n• House Wiring: ₹2,500 – ₹15,000\n• Repairs & Fixes: ₹150 – ₹2,000\n• EB Meter Installation: ₹1,500 – ₹3,000\n• Fan & Light: ₹200 – ₹500\n• AC Installation: ₹1,200 – ₹2,500\n• Solar Panel: ₹15,000 – ₹50,000\n\nExact pricing depends on the electrician and scope of work.");

        // Emergency
        RESPONSES.put("emergency|urgent|power out|no power|blackout|short circuit",
                "⚡ For electrical emergencies:\n1. Turn off the main switch immediately\n2. Don't touch any exposed wires\n3. Book our Emergency 24/7 service\n4. Our electricians can arrive within 20-30 minutes\n\nGo to Find Electricians and filter by 'Emergency' specialty.");

        // Troubleshooting - tripping
        RESPONSES.put("tripping|mcb|circuit breaker|fuse",
                "🔧 MCB/Circuit Breaker Tripping? Try these steps:\n1. Unplug all appliances on that circuit\n2. Reset the MCB\n3. Plug appliances back one at a time\n4. If it trips again, there may be a short circuit\n5. Book an electrician for fault finding\n\n⚠️ Don't repeatedly force the MCB on.");

        // Troubleshooting - flickering
        RESPONSES.put("flicker|flickering|dim|dimming|light problem",
                "💡 Flickering/Dimming Lights? Possible causes:\n• Loose bulb or connection\n• Voltage fluctuation\n• Overloaded circuit\n• Faulty wiring\n\nTry tightening the bulb first. If it persists, book an electrician for inspection.");

        // Troubleshooting - shock
        RESPONSES.put("shock|electric shock|tingling",
                "⚠️ Getting electrical shocks? This is SERIOUS!\n1. STOP using the appliance immediately\n2. Turn off the main switch\n3. Check if your earthing is proper\n4. This could mean faulty wiring or poor grounding\n5. Book an electrician URGENTLY\n\nDon't ignore electrical shocks!");

        // Solar
        RESPONSES.put("solar|solar panel|renewable|energy saving",
                "☀️ Solar Panel Information:\n• Typical home setup: 1kW – 5kW\n• Cost: ₹15,000 – ₹50,000\n• Save 50-80% on electricity bills\n• Govt subsidy available under PM Surya Ghar\n• Net metering facility available\n\nOur solar-certified electricians can help with installation!");

        // Smart home
        RESPONSES.put("smart home|automation|smart switch|iot|alexa|google home",
                "🏠 Smart Home Automation:\n• Smart switches & dimmers\n• Voice control (Alexa/Google Home)\n• Automated lighting schedules\n• Energy monitoring\n• Cost: ₹5,000 – ₹20,000\n\nLook for electricians with 'Smart Home' specialty.");

        // Safety
        RESPONSES.put("safety|safe|precaution|tip",
                "🛡️ Electrical Safety Tips:\n• Never overload sockets with multiple adapters\n• Install RCCB/ELCB for shock protection\n• Get wiring inspected every 5 years\n• Use ISI-marked products only\n• Keep electrical panels accessible\n• Install earthing for all metal appliances");

        // Account
        RESPONSES.put("register|sign up|account|login",
                "📋 To create an account:\n1. Click 'Sign Up' in the top navigation\n2. Choose Customer or Electrician role\n3. Fill in your details\n4. Start booking services!\n\nAlready have an account? Click 'Login' to sign in.");

        // Thank you
        RESPONSES.put("thank|thanks|bye|goodbye",
                "You're welcome! 😊 If you need any more help, feel free to ask. Have a great day! ⚡");
    }

    public String getResponse(String userMessage) {
        String message = userMessage.toLowerCase().trim();

        for (Map.Entry<String, String> entry : RESPONSES.entrySet()) {
            String[] keywords = entry.getKey().split("\\|");
            for (String keyword : keywords) {
                if (message.contains(keyword.trim())) {
                    return entry.getValue();
                }
            }
        }

        return "I'm not sure I understand that. I can help you with:\n• 🔌 Finding electricians\n• 📅 Booking a service\n• 💰 Service pricing\n• 🔧 Troubleshooting tips\n• ⚡ Emergency assistance\n• ☀️ Solar panel info\n• 🏠 Smart home setup\n\nTry asking about any of these topics!";
    }
}
