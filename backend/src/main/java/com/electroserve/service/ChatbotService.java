package com.electroserve.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatbotService {

    private static final List<KnowledgeEntry> KNOWLEDGE_BASE = new ArrayList<>();

    static {
        // Greetings
        addEntry(Arrays.asList("hello", "hi", "hey", "good morning", "good evening", "greetings", "howdy"),
                "Hello! 👋 Welcome to ElectroServe. I'm ServeBot, your AI assistant. I can help with:\n• ⚡ Finding electricians\n• 🚿 Finding plumbers\n• 📅 Booking services\n• 💰 Service pricing\n• 🔧 Troubleshooting tips\n\nHow can I assist you today?");

        // Booking
        addEntry(Arrays.asList("book", "booking", "schedule", "appointment", "reserve", "book a service"),
                "To book a service:\n1. Go to 'Categories' in the navigation\n2. Choose 'Find Electrician' or 'Find Plumber'\n3. Browse and select a professional\n4. Click 'Book Now' on their profile\n5. Choose service type, date & time\n6. Confirm your booking!\n\nWould you like help finding a specific professional?");

        // Electrical pricing
        addEntry(Arrays.asList("price", "cost", "rate", "charge", "fee", "how much", "pricing", "rates"),
                "Here are typical service rates:\n\n⚡ ELECTRICAL:\n• House Wiring: ₹2,500 – ₹15,000\n• Repairs & Fixes: ₹150 – ₹2,000\n• EB Meter: ₹1,500 – ₹3,000\n• Fan & Light: ₹200 – ₹500\n• AC Installation: ₹1,200 – ₹2,500\n\n🚿 PLUMBING:\n• Pipe Repair: ₹300 – ₹2,000\n• Leak Detection: ₹500 – ₹1,500\n• Bathroom Fitting: ₹2,000 – ₹10,000\n• Water Heater: ₹1,000 – ₹3,000\n\nExact pricing depends on the professional and scope of work.");

        // Plumbing specific
        addEntry(Arrays.asList("plumber", "plumbing", "pipe", "leak", "water", "tap", "faucet", "drain", "bathroom", "toilet", "sewer", "geyser"),
                "🚿 Plumbing Services Available:\n• Pipe Repair & Installation\n• Leak Detection & Fixing\n• Bathroom & Kitchen Fitting\n• Water Heater Installation\n• Drainage & Sewer Cleaning\n• Water Tank Installation\n• 24/7 Emergency Plumbing\n\nGo to Categories → Find Plumber to browse verified plumbers near you!");

        // Electrician specific
        addEntry(Arrays.asList("electrician", "electrical", "wiring", "wire", "switch", "socket", "electric"),
                "⚡ Electrical Services Available:\n• House Wiring & Rewiring\n• Repairs & Troubleshooting\n• EB Meter Installation\n• Fan & Light Setup\n• AC Installation\n• Solar & Inverter\n• Smart Home Automation\n• 24/7 Emergency Service\n\nGo to Categories → Find Electrician to browse verified electricians!");

        // Emergency
        addEntry(Arrays.asList("emergency", "urgent", "power out", "no power", "blackout", "short circuit", "burst pipe", "flooding"),
                "🚨 EMERGENCY? Here's what to do:\n\n⚡ Electrical Emergency:\n1. Turn off the main switch\n2. Don't touch exposed wires\n3. Book Emergency 24/7 electrician\n\n🚿 Plumbing Emergency:\n1. Turn off the main water valve\n2. Move valuables away from water\n3. Book Emergency 24/7 plumber\n\nOur professionals can arrive within 20-30 minutes!");

        // MCB/Tripping
        addEntry(Arrays.asList("tripping", "mcb", "circuit breaker", "fuse", "trip"),
                "🔧 MCB/Circuit Breaker Tripping? Try:\n1. Unplug all appliances on that circuit\n2. Reset the MCB\n3. Plug in appliances one at a time\n4. If it trips again, there may be a short circuit\n5. Book an electrician for fault finding\n\n⚠️ Don't repeatedly force the MCB on.");

        // Flickering lights
        addEntry(Arrays.asList("flicker", "flickering", "dim", "dimming", "light problem", "bulb"),
                "💡 Flickering/Dimming Lights? Possible causes:\n• Loose bulb or connection\n• Voltage fluctuation\n• Overloaded circuit\n• Faulty wiring\n\nTry tightening the bulb first. If it persists, book an electrician.");

        // Electric shock
        addEntry(Arrays.asList("shock", "electric shock", "tingling"),
                "⚠️ Getting electrical shocks? This is SERIOUS!\n1. STOP using the appliance immediately\n2. Turn off the main switch\n3. Check if earthing is proper\n4. Book an electrician URGENTLY\n\nDon't ignore electrical shocks — they can be dangerous!");

        // Water leak
        addEntry(Arrays.asList("water leak", "leaking", "dripping", "drip"),
                "💧 Water Leak? Follow these steps:\n1. Turn off the water supply valve\n2. Place a bucket under the leak\n3. Check if it's from a joint or pipe\n4. Book a plumber for repair\n\nSmall leaks can become big problems — fix them early!");

        // Blocked drain
        addEntry(Arrays.asList("blocked", "clogged", "clog", "drain blocked", "slow drain"),
                "🚰 Blocked Drain? Try:\n1. Pour boiling water down the drain\n2. Use a plunger\n3. Try baking soda + vinegar solution\n4. If still blocked, book a plumber\n\nDon't use harsh chemicals frequently — they can damage pipes.");

        // Solar
        addEntry(Arrays.asList("solar", "solar panel", "renewable", "energy saving"),
                "☀️ Solar Panel Info:\n• Home setup: 1kW – 5kW\n• Cost: ₹15,000 – ₹50,000\n• Save 50-80% on electricity bills\n• Govt subsidy available\n• Net metering facility available\n\nOur solar-certified electricians can help!");

        // Smart home
        addEntry(Arrays.asList("smart home", "automation", "smart switch", "iot", "alexa", "google home"),
                "🏠 Smart Home Automation:\n• Smart switches & dimmers\n• Voice control (Alexa/Google Home)\n• Automated lighting schedules\n• Energy monitoring\n• Cost: ₹5,000 – ₹20,000\n\nLook for electricians with 'Smart Home' specialty.");

        // Safety
        addEntry(Arrays.asList("safety", "safe", "precaution", "tip", "tips"),
                "🛡️ Safety Tips:\n\n⚡ Electrical:\n• Never overload sockets\n• Install RCCB/ELCB\n• Get wiring inspected every 5 years\n• Use ISI-marked products\n\n🚿 Plumbing:\n• Check for leaks regularly\n• Don't pour grease down drains\n• Insulate pipes in winter\n• Know your main shutoff valve");

        // Account
        addEntry(Arrays.asList("register", "sign up", "account", "login", "signup"),
                "📋 Account Help:\n1. Click 'Sign Up' in the navigation\n2. Choose Customer role\n3. Fill in your details\n4. Start booking services!\n\nAlready have an account? Click 'Login' to sign in.");

        // Categories
        addEntry(Arrays.asList("categories", "category", "services list", "what services"),
                "📂 Our Service Categories:\n\n⚡ Electrician Services:\n• House Wiring, Repairs, EB Services\n• Fan & Light, AC, Solar, Smart Home\n\n🚿 Plumber Services:\n• Pipe Repair, Leak Detection\n• Bathroom/Kitchen Fitting\n• Water Heater, Drainage\n\nGo to 'Categories' in the menu to get started!");

        // Thank you
        addEntry(Arrays.asList("thank", "thanks", "bye", "goodbye", "see you"),
                "You're welcome! 😊 If you need any more help, feel free to ask. Have a great day! ⚡🚿");

        // Help
        addEntry(Arrays.asList("help", "assist", "support", "what can you do"),
                "I'm ServeBot, your AI assistant! I can help with:\n\n1. 🔍 Finding electricians or plumbers\n2. 📅 Booking guidance\n3. 💰 Service pricing\n4. 🔧 Troubleshooting tips\n5. 🚨 Emergency assistance\n6. ☀️ Solar panel info\n7. 🏠 Smart home setup\n8. 🛡️ Safety tips\n\nJust ask about any of these topics!");
    }

    private static void addEntry(List<String> keywords, String response) {
        KNOWLEDGE_BASE.add(new KnowledgeEntry(keywords, response));
    }

    public String getResponse(String userMessage) {
        String message = userMessage.toLowerCase().trim();

        // Score each knowledge entry based on keyword matches
        KnowledgeEntry bestMatch = null;
        int bestScore = 0;

        for (KnowledgeEntry entry : KNOWLEDGE_BASE) {
            int score = 0;
            for (String keyword : entry.keywords) {
                if (message.contains(keyword)) {
                    // Longer keyword matches score higher (more specific)
                    score += keyword.length();
                }
                // Fuzzy: check if any word in the message starts with the keyword
                for (String word : message.split("\\s+")) {
                    if (word.startsWith(keyword.substring(0, Math.min(3, keyword.length())))) {
                        score += 1;
                    }
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        if (bestMatch != null && bestScore >= 3) {
            return bestMatch.response;
        }

        return "I'm not quite sure about that, but I can help you with:\n\n• 🔍 Finding electricians or plumbers\n• 📅 Booking a service\n• 💰 Service pricing\n• 🔧 Troubleshooting tips\n• 🚨 Emergency assistance\n• ☀️ Solar panel info\n• 🚿 Plumbing help\n\nTry asking about any of these topics, or type 'help' for more options!";
    }

    private static class KnowledgeEntry {
        final List<String> keywords;
        final String response;

        KnowledgeEntry(List<String> keywords, String response) {
            this.keywords = keywords;
            this.response = response;
        }
    }
}
