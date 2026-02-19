import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Upload,
  Book,
  Shield,
  Send,
  Loader2,
} from "lucide-react";

const InputGroup = ({ label, icon: Icon, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
      {Icon && <Icon size={16} className="text-blue-600" />}
      {label}
    </label>
    {children}
  </div>
);

const SectionTitle = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-2 mb-6 mt-8 pb-2 border-b-2 border-blue-100">
    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
  </div>
);

const StudentRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    rollNo: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    age: "",
    caste: "",
    religion: "",
    region: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    department: "",
    year: "",
    admissionYear: new Date().getFullYear(),
    guardianName: "",
    guardianPhone: "",
    // Files will be stored as base64 strings here
    profilePhoto: "",
    documents: {
      tenthMarksheet: "",
      twelfthMarksheet: "",
      aadhaarCard: "",
      casteCertificate: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      age: value ? calculateAge(value) : "",
    }));
  };

  const handleFileChange = (e, fieldPath) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => {
      if (fieldPath === "profilePhoto") {
        return { ...prev, profilePhoto: file };
      }

      const [, docName] = fieldPath.split(".");
      return {
        ...prev,
        documents: {
          ...prev.documents,
          [docName]: file,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/student/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();

      if (response.ok) {
        alert(
          "Registration Successful! Please check your email for verification.",
        );
        // Reset form or redirect
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight sm:text-5xl">
            Student Registration
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join our academic management system. Please fill in your details
            accurately.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-12">
            {/* Basic Info */}
            <SectionTitle title="Basic Information" icon={User} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Full Name" icon={User}>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                />
              </InputGroup>
              <InputGroup label="Username" icon={User}>
                <input
                  required
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="johndoe123"
                />
              </InputGroup>
              <InputGroup label="Email Address" icon={Mail}>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="john@example.com"
                />
              </InputGroup>
              <InputGroup label="Phone Number" icon={Phone}>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="+1 234 567 8900"
                />
              </InputGroup>
              <InputGroup label="Roll Number" icon={User}>
                <input
                  required
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="CS-2023-001"
                />
              </InputGroup>
              <InputGroup label="Profile Photo" icon={Upload}>
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "profilePhoto")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {formData.profilePhoto ? (
                      <span className="text-green-600 font-medium">
                        Image Selected
                      </span>
                    ) : (
                      <span>Click to Upload Profile Photo</span>
                    )}
                  </div>
                </div>
              </InputGroup>
            </div>

            {/* Personal Details */}
            <SectionTitle title="Personal Details" icon={Calendar} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Gender" icon={User}>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </InputGroup>
              <InputGroup label="Date of Birth" icon={Calendar}>
                <input
                  required
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDateChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
              <InputGroup label="Age" icon={Calendar}>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed outline-none"
                  placeholder="Auto-calculated"
                />
              </InputGroup>
              <InputGroup label="Caste" icon={User}>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
              <InputGroup label="Religion" icon={User}>
                <input
                  type="text"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
              <InputGroup label="Region" icon={MapPin}>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
            </div>

            {/* Address */}
            <SectionTitle title="Address" icon={MapPin} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <InputGroup label="Street Address" icon={MapPin}>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="123 Main St"
                  />
                </InputGroup>
              </div>
              <InputGroup label="City" icon={MapPin}>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
              <InputGroup label="State" icon={MapPin}>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
              <InputGroup label="Pincode" icon={MapPin}>
                <input
                  type="text"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
            </div>

            {/* Academic & Guardian */}
            <SectionTitle title="Academic & Guardian Info" icon={Book} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Department" icon={Book}>
                <input
                  required
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="Computer Science"
                />
              </InputGroup>
              <InputGroup label="Year" icon={Book}>
                <input
                  required
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  placeholder="1"
                />
              </InputGroup>
              <InputGroup label="Guardian Name" icon={User}>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
              <InputGroup label="Guardian Phone" icon={Phone}>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
              </InputGroup>
            </div>

            {/* Documents */}
            <SectionTitle title="Documents (Upload)" icon={Shield} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "tenthMarksheet",
                "twelfthMarksheet",
                "aadhaarCard",
                "casteCertificate",
              ].map((doc) => (
                <InputGroup
                  key={doc}
                  label={doc
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .toUpperCase()}
                  icon={Upload}
                >
                  <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      required={["tenthMarksheet", "twelfthMarksheet"].includes(
                        doc,
                      )}
                      onChange={(e) => handleFileChange(e, `documents.${doc}`)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      {formData.documents[doc] ? (
                        <span className="text-green-600 font-bold">
                          File Attached
                        </span>
                      ) : (
                        <span>Upload {doc}</span>
                      )}
                    </div>
                  </div>
                </InputGroup>
              ))}
            </div>

            {/* Submit */}
            <div className="mt-12 flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="group relative w-full md:w-1/2 flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : (
                  <Send className="mr-2" />
                )}
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
