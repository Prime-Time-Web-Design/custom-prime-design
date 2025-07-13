"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  ChevronDown,
  Check,
} from "lucide-react";
import { PageBlocksAppointmentBookingBlock } from "../../../tina/__generated__/types";
import { Section } from "../layout/Section";

interface AppointmentBookingBlockProps {
  data: PageBlocksAppointmentBookingBlock;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Service {
  id: string;
  name: string;
  duration: string;
  price?: string | null;
}

export const AppointmentBookingBlock = ({
  data,
}: AppointmentBookingBlockProps) => {
  const {
    title = "Book Your Appointment",
    subtitle = "Schedule a consultation with our team",
    services,
    backgroundColor = "bg-bg",
    textColor = "text-text",
    buttonText = "Book Appointment",
    availableDays,
    timeSlots,
    requiresPhone = true,
    requiresNotes = false,
    successMessage = "Thank you! Your appointment request has been submitted.",
  } = data;

  // Provide default values and handle null cases
  const safeServices = services || [];
  const safeAvailableDays = availableDays || [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const safeTimeSlots = timeSlots || [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // Form state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  // Generate available dates for the next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      if (safeAvailableDays.includes(dayName)) {
        dates.push({
          value: date.toISOString().split("T")[0],
          label: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          dayName,
        });
      }
    }
    return dates.slice(0, 14); // Show next 14 available dates
  };

  const availableDates = generateAvailableDates();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would integrate with Nex Health API
      // For now, we'll simulate a submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Appointment Data:", {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        ...formData,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    selectedService &&
    selectedDate &&
    selectedTime &&
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    (!requiresPhone || formData.phone);

  if (isSubmitted) {
    return (
      <Section
        background={backgroundColor || "bg-bg"}
        className="py-16 md:py-20"
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-text">
              Appointment Requested
            </h2>
            <p className="text-lg mb-8 text-text/80">{successMessage}</p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedService(null);
                setSelectedDate("");
                setSelectedTime("");
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  notes: "",
                });
              }}
              className="px-8 py-3 bg-primary hover:bg-primary-hover text-[var(--color-deep-slate)] font-medium rounded-lg transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section background={backgroundColor || "bg-bg"} className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-lg ${textColor}/80 max-w-2xl mx-auto`}>
                {subtitle}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-primary mr-3" />
                <h3 className="text-lg font-semibold text-text">
                  Select Service
                </h3>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className="w-full p-4 text-left bg-bg border border-accent/30 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors"
                >
                  <span
                    className={selectedService ? "text-text" : "text-text/60"}
                  >
                    {selectedService?.name || "Choose a service..."}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text/60 transition-transform ${
                      showServiceDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showServiceDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-accent/30 rounded-lg shadow-lg z-10">
                    {safeServices.map((service, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          if (service) {
                            setSelectedService({
                              id: service.id,
                              name: service.name,
                              duration: service.duration,
                              price: service.price || undefined,
                            });
                            setShowServiceDropdown(false);
                          }
                        }}
                        className="w-full p-4 text-left hover:bg-bg transition-colors border-b border-accent/10 last:border-b-0"
                      >
                        <div className="font-medium text-text">
                          {service?.name}
                        </div>
                        <div className="text-sm text-text/60 flex items-center gap-4">
                          <span>{service?.duration}</span>
                          {service?.price && <span>{service.price}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-primary mr-3" />
                <h3 className="text-lg font-semibold text-text">
                  Select Date & Time
                </h3>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-text mb-3">
                  Choose Date
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {availableDates.map((date) => (
                    <button
                      key={date.value}
                      type="button"
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedDate === date.value
                          ? "bg-primary border-primary text-[var(--color-deep-slate)]"
                          : "bg-bg border-accent/30 text-text hover:border-primary/50"
                      }`}
                    >
                      <div className="text-xs opacity-70">{date.dayName}</div>
                      <div>{date.label.split(" ").slice(1).join(" ")}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-text mb-3">
                    Choose Time
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {safeTimeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time || "")}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? "bg-primary border-primary text-[var(--color-deep-slate)]"
                            : "bg-bg border-accent/30 text-text hover:border-primary/50"
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-accent/20">
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <h3 className="text-lg font-semibold text-text">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full p-3 border border-accent/30 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full p-3 border border-accent/30 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 border border-accent/30 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Phone Number {requiresPhone ? "*" : "(Optional)"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full p-3 border border-accent/30 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors"
                    required={requiresPhone || false}
                  />
                </div>
              </div>

              {requiresNotes && (
                <div className="mt-4">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-text mb-2"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-accent/30 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-colors resize-vertical"
                    placeholder="Tell us about your needs or any specific requirements..."
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`px-12 py-4 rounded-lg font-medium text-lg transition-all ${
                  isFormValid && !isLoading
                    ? "bg-primary hover:bg-primary-hover text-[var(--color-deep-slate)] shadow-sm hover:shadow-md"
                    : "bg-accent/50 text-text/50 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-[var(--color-deep-slate)]/30 border-t-[var(--color-deep-slate)] rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  buttonText
                )}
              </button>

              {!isFormValid && (
                <p className="text-sm text-text/60 mt-3">
                  Please fill in all required fields to continue
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default AppointmentBookingBlock;
