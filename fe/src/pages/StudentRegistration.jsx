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
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic Info", subtitle: "Name, email & contact", icon: User },
  { id: 2, title: "Personal", subtitle: "DOB, gender & background", icon: Calendar },
  { id: 3, title: "Address", subtitle: "Where you live", icon: MapPin },
  { id: 4, title: "Academic", subtitle: "Department & guardian", icon: Book },
  { id: 5, title: "Documents", subtitle: "Upload required files", icon: Shield },
];

const InputField = ({ label, required, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-slate-600 tracking-wide uppercase">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 " +
  "focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 " +
  "transition-all duration-200 placeholder:text-slate-400";

const selectClass =
  "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 " +
  "focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 " +
  "transition-all duration-200 cursor-pointer";

const FileUpload = ({ label, required, value, onChange }) => (
  <InputField label={label} required={required}>
    <label
      className={
        "relative flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 " +
        (value
          ? "border-emerald-400 bg-emerald-50"
          : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50")
      }
    >
      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={onChange} />
      {value ? (
        <>
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check size={20} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-emerald-600">File Attached!</span>
        </>
      ) : (
        <>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
            <Upload size={18} className="text-slate-500" />
          </div>
          <span className="text-sm text-slate-500">Click to upload</span>
        </>
      )}
    </label>
  </InputField>
);

const StepBar = ({ currentStep }) => (
  <div className="flex items-center justify-between mb-10 px-2">
    {STEPS.map((step, index) => {
      const isCompleted = currentStep > step.id;
      const isActive = currentStep === step.id;
      return (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-2">
            <div
              className={
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 " +
                (isCompleted
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                  : isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110"
                  : "bg-slate-200 text-slate-500")
              }
            >
              {isCompleted ? <Check size={16} /> : step.id}
            </div>
            <span
              className={
                "text-xs font-semibold hidden sm:block " +
                (isActive ? "text-blue-600" : isCompleted ? "text-emerald-500" : "text-slate-400")
              }
            >
              {step.title}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={
                "flex-1 h-0.5 mx-2 transition-all duration-500 " +
                (currentStep > step.id ? "bg-emerald-400" : "bg-slate-200")
              }
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ============================================================
// STEP COMPONENTS — receive formData & handlers as props
// ============================================================

const Step1_BasicInfo = ({ formData, handleChange, handleFileChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <InputField label="Full Name" required>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={inputClass}
        placeholder="John Doe"
      />
    </InputField>
    <InputField label="Username" required>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className={inputClass}
        placeholder="johndoe123"
      />
    </InputField>
    <InputField label="Email Address" required>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={inputClass}
        placeholder="john@example.com"
      />
    </InputField>
    <InputField label="Phone Number" required>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={inputClass}
        placeholder="+91 98765 43210"
      />
    </InputField>
    <div className="sm:col-span-2">
      <FileUpload
        label="Profile Photo"
        value={formData.profilePhoto}
        onChange={(e) => handleFileChange(e, "profilePhoto")}
      />
    </div>
  </div>
);

const Step2_PersonalDetails = ({ formData, handleChange, handleDobChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <InputField label="Gender">
      <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </InputField>
    <InputField label="Date of Birth" required>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleDobChange}
        className={inputClass}
      />
    </InputField>
    <InputField label="Age">
      <input
        type="number"
        value={formData.age}
        readOnly
        className={inputClass + " bg-slate-100 cursor-not-allowed"}
        placeholder="Auto-calculated"
      />
    </InputField>
    <InputField label="Region">
      <input
        type="text"
        name="region"
        value={formData.region}
        onChange={handleChange}
        className={inputClass}
        placeholder="North / South / East / West"
      />
    </InputField>
    <InputField label="Caste">
      <input
        type="text"
        name="caste"
        value={formData.caste}
        onChange={handleChange}
        className={inputClass}
        placeholder="General / OBC / SC / ST"
      />
    </InputField>
    <InputField label="Religion">
      <input
        type="text"
        name="religion"
        value={formData.religion}
        onChange={handleChange}
        className={inputClass}
        placeholder="Hindu / Muslim / Christian..."
      />
    </InputField>
  </div>
);

const Step3_Address = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div className="sm:col-span-2">
      <InputField label="Street Address">
        <input
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          className={inputClass}
          placeholder="123, Main Street, Near Park"
        />
      </InputField>
    </div>
    <InputField label="City">
      <input
        type="text"
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        className={inputClass}
        placeholder="Mumbai"
      />
    </InputField>
    <InputField label="State">
      <input
        type="text"
        name="address.state"
        value={formData.address.state}
        onChange={handleChange}
        className={inputClass}
        placeholder="Maharashtra"
      />
    </InputField>
    <InputField label="Pincode">
      <input
        type="text"
        name="address.pincode"
        value={formData.address.pincode}
        onChange={handleChange}
        className={inputClass}
        placeholder="400001"
      />
    </InputField>
  </div>
);

const Step4_Academic = ({ formData, handleChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <InputField label="Department" required>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        className={inputClass}
        placeholder="Computer Science"
      />
    </InputField>
    <InputField label="Year" required>
      <select name="year" value={formData.year} onChange={handleChange} className={selectClass}>
        <option value="">Select Year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>
    </InputField>
    <InputField label="Admission Year">
      <input
        type="number"
        name="admissionYear"
        value={formData.admissionYear}
        onChange={handleChange}
        className={inputClass}
      />
    </InputField>
    <InputField label="Guardian Name">
      <input
        type="text"
        name="guardianName"
        value={formData.guardianName}
        onChange={handleChange}
        className={inputClass}
        placeholder="Parent / Guardian full name"
      />
    </InputField>
    <InputField label="Guardian Phone">
      <input
        type="tel"
        name="guardianPhone"
        value={formData.guardianPhone}
        onChange={handleChange}
        className={inputClass}
        placeholder="+91 98765 43210"
      />
    </InputField>
  </div>
);

const Step5_Documents = ({ formData, handleFileChange }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <FileUpload
      label="10th Marksheet"
      required
      value={formData.documents.tenthMarksheet}
      onChange={(e) => handleFileChange(e, "documents.tenthMarksheet")}
    />
    <FileUpload
      label="12th Marksheet"
      required
      value={formData.documents.twelfthMarksheet}
      onChange={(e) => handleFileChange(e, "documents.twelfthMarksheet")}
    />
    <FileUpload
      label="Aadhaar Card"
      value={formData.documents.aadhaarCard}
      onChange={(e) => handleFileChange(e, "documents.aadhaarCard")}
    />
    <FileUpload
      label="Caste Certificate"
      value={formData.documents.casteCertificate}
      onChange={(e) => handleFileChange(e, "documents.casteCertificate")}
    />
  </div>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
const StudentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    profilePhoto: "",
    gender: "Male",
    dob: "",
    age: "",
    caste: "",
    religion: "",
    region: "",
    address: { street: "", city: "", state: "", pincode: "" },
    department: "",
    year: "",
    admissionYear: new Date().getFullYear(),
    guardianName: "",
    guardianPhone: "",
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
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDobChange = (e) => {
    const dob = e.target.value;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    setFormData((prev) => ({ ...prev, dob, age }));
  };

  const handleFileChange = (e, fieldPath) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (fieldPath === "profilePhoto") {
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result }));
      } else {
        const [, docName] = fieldPath.split(".");
        setFormData((prev) => ({
          ...prev,
          documents: { ...prev.documents, [docName]: reader.result },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/student/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render the correct step, passing all needed props
  const renderStep = () => {
    const props = { formData, handleChange, handleDobChange, handleFileChange };
    switch (currentStep) {
      case 1: return <Step1_BasicInfo {...props} />;
      case 2: return <Step2_PersonalDetails {...props} />;
      case 3: return <Step3_Address {...props} />;
      case 4: return <Step4_Academic {...props} />;
      case 5: return <Step5_Documents {...props} />;
      default: return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
            <Check size={36} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Registration Successful!</h2>
          <p className="text-slate-500 text-lg">
            Please check your email for verification. Welcome aboard!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Student Registration</h1>
          <p className="mt-2 text-slate-500 text-lg">Complete all 5 steps to register</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-8 sm:p-10">
            <StepBar currentStep={currentStep} />

            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  {React.createElement(STEPS[currentStep - 1].icon, {
                    size: 22,
                    className: "text-blue-600",
                  })}
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">
                    {STEPS[currentStep - 1].title}
                  </h2>
                  <p className="text-slate-500 text-sm">{STEPS[currentStep - 1].subtitle}</p>
                </div>
              </div>
            </div>

            {/* Step Content */}
            {renderStep()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={18} /> Back
              </button>

              <span className="text-sm text-slate-400 font-medium">
                Step {currentStep} of {STEPS.length}
              </span>

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Next <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {loading ? "Submitting..." : "Submit Registration"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;