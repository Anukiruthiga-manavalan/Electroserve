-- Insert sample electricians (passwords are bcrypt hash for 'password123')
INSERT INTO electricians (name, phone, email, password, specialization, experience_years, location, availability_status, rating, bio, photo, certifications, services_offered, hourly_rate) VALUES
('Rajesh Kumar', '+91 98765 43210', 'rajesh.k@electroserve.in', '$2a$10$iM2vVwT5g80nQ8v.E.iW7O.v.q0Cj.qE.Bf.m.iV.w.g.5XzO.J7.', 'House Wiring', 12, 'Anna Nagar, Chennai', 'Available', 4.9, 'Certified master electrician with 12+ years of experience in residential and commercial wiring.', '', 'Licensed Electrical Contractor, TNELB Certified, Solar Panel Installation', 'House Wiring (New), EB Meter Installation, Electrical Panel Upgrade', 350.0),
('Senthil Murugan', '+91 98765 11223', 'senthil.m@electroserve.in', '$2a$10$iM2vVwT5g80nQ8v.E.iW7O.v.q0Cj.qE.Bf.m.iV.w.g.5XzO.J7.', 'AC Wiring', 15, 'T. Nagar, Chennai', 'Available', 4.8, 'Industrial and residential electrical expert. Specialized in AC installation wiring and high-voltage troubleshooting.', '', 'ITI Electrical, Industrial Electrician Grade I, AC Installation Certified', 'AC Installation Wiring, Industrial Wiring, Fault Finding', 400.0),
('Mohammed Farhan', '+91 98765 22334', 'farhan.m@electroserve.in', '$2a$10$iM2vVwT5g80nQ8v.E.iW7O.v.q0Cj.qE.Bf.m.iV.w.g.5XzO.J7.', 'Solar Panel', 8, 'Velachery, Chennai', 'Unavailable', 4.7, 'Specialist in solar panel installation and smart home automation.', '', 'Solar PV Installation, Smart Home Certified', 'Solar Panel Installation, Inverter Setup, Smart Home Wiring', 450.0),
('Vignesh Babu', '+91 98765 33445', 'vignesh.b@electroserve.in', '$2a$10$iM2vVwT5g80nQ8v.E.iW7O.v.q0Cj.qE.Bf.m.iV.w.g.5XzO.J7.', 'Repairs', 6, 'Adyar, Chennai', 'Available', 4.6, 'Quick-response electrician for emergency repairs and routine maintenance.', '', 'ITI Electrical, Emergency Response Trained', 'Emergency Repair, Switch & Socket Repair', 300.0);

-- Insert sample customer
INSERT INTO customers (name, email, phone, address, password, created_at) VALUES
('Test Customer', 'customer@test.com', '9876543210', 'Chennai', '$2a$10$iM2vVwT5g80nQ8v.E.iW7O.v.q0Cj.qE.Bf.m.iV.w.g.5XzO.J7.', CURRENT_TIMESTAMP());

-- Insert sample reviews
INSERT INTO reviews (customer_id, electrician_id, rating, comment, review_date) VALUES
(1, 1, 5, 'Excellent work on our entire house rewiring. Very professional.', CURRENT_TIMESTAMP()),
(1, 2, 5, 'Best electrician for AC installation. Neat work.', CURRENT_TIMESTAMP()),
(1, 3, 4, 'Smart home automation was done well.', CURRENT_TIMESTAMP());
