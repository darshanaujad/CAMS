import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CATEGORIES, RELIGIONS, DEPARTMENTS, YEARS, DIAL_CODES } from "../common/constant";
import axios from 'axios';

// ─── API Function ─────────────────────────────────────────────────────────────
const registerStudent = async (payload) => {

  const res = await fetch("http://localhost:5000/api/student/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Registration failed. Please try again.");
  }
  return res.json();
};

// ─── Constants ────────────────────────────────────────────────────────────────

const INIT_FORM = {
  fullName: "", email: "",
  dialCode: "+91 IN", phone: "",
  gender: "", dob: "",
  religion: "", category: "", caste: "",
  department: "", year: "",
  SSCMarksheet: null, HSCMarksheet: null,
};

// ─── Validation ───────────────────────────────────────────────────────────────
const validate = (f) => {
  const e = {};
  if (!f.fullName.trim()) e.fullName = "Full name is required.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (!f.phone.trim()) e.phone = "Phone number is required.";
  else if (!/^\d{7,15}$/.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (!f.gender) e.gender = "Please select a gender.";
  if (!f.dob) e.dob = "Date of birth is required.";
  if (!f.religion) e.religion = "Religion is required.";
  if (!f.category) e.category = "Category is required.";
  if (!f.department) e.department = "Department is required.";
  if (!f.year) e.year = "Academic year is required.";
  if (!f.SSCMarksheet) e.SSCMarksheet = "10th grade marksheet is required.";
  if (!f.HSCMarksheet) e.HSCMarksheet = "12th grade marksheet is required.";
  return e;
};

// ─── Root Component ───────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [form, setForm] = useState(INIT_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [declared, setDeclared] = useState(false);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: () => {
      setSuccess(true);
      setForm(INIT_FORM);
      setTouched({});
      setErrors({});
      setDeclared(false);
    },
    onError: (err) => {
      setErrors((prev) => ({ ...prev, _api: err.message }));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleFile = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["application/pdf", "image/jpeg", "image/jpg"].includes(file.type)) {
      return setErrors((prev) => ({
        ...prev,
        [field]: "Only PDF or JPG accepted.",
      }));
    }

    if (file.size > 5 * 1024 * 1024) {
      return setErrors((prev) => ({
        ...prev,
        [field]: "File must be under 5MB.",
      }));
    }

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", `${import.meta.env.VITE_CLOUDINARY_PRESET_NAME}`);
      // replace with your preset name

      const res = await axios.post(
        import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
        data
      );

      const result = await res.data;

      // store cloudinary url in form
      setForm((prev) => ({
        ...prev,
        [field]: result.secure_url,
      }));

      setErrors((prev) => ({ ...prev, [field]: undefined }));

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(INIT_FORM).reduce((a, k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (!declared) {
      setErrors((prev) => ({ ...prev, declared: "You must accept the declaration." }));
      return;
    }
    setSuccess(false);
    mutation.mutate({
      fullName: form.fullName,
      email: form.email,
      phone: `${form.dialCode.split(" ")[0]}${form.phone}`,
      gender: form.gender,
      dob: form.dob,
      religion: form.religion,
      category: form.category,
      caste: form.caste,
      department: form.department,
      year: form.year,
      SSCMarksheet: form.SSCMarksheet,
      HSCMarksheet: form.HSCMarksheet,
    });
  };

  // Border color utility
  const borderFor = (name) =>
    errors[name]
      ? "border-red-500"
      : touched[name] && !errors[name]
        ? "border-green-600"
        : "border-gray-300";

  return (

    <>
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Serif:wght@600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: #eef0f3; }
        .reg-form { font-family: 'IBM Plex Sans', sans-serif; }
        .rf-input:focus, .rf-select:focus {
          outline: none;
          border-color: #1d3461 !important;
          box-shadow: 0 0 0 3px rgba(29, 52, 97, 0.10);
        }
        .rf-btn-submit:hover:not(:disabled) { background: #162849 !important; }
        .rf-btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .rf-btn-draft:hover { background: #dde1ea !important; }
        .rf-upload-label:hover { background: #e4ecf5 !important; border-color: #9dafc8 !important; }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.5; }
      `}</style>

      <div className="min-h-screen bg-[#eef0f3] flex justify-center items-start py-10 px-4 reg-form">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full bg-white rounded overflow-hidden"
          style={{ maxWidth: 1020, boxShadow: "0 2px 8px rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.06)" }}
        >

          {/* ── HEADER ───────────────────────────────────────────── */}
          <div className="bg-[#1d3461] px-10 py-8">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                <span
                  className="text-white text-base font-semibold tracking-widest"
                  style={{ fontFamily: "'IBM Plex Serif', serif" }}
                >
                  SR
                </span>
              </div>
              <div>
                <h1
                  className="text-white text-xl font-semibold tracking-tight"
                  style={{ fontFamily: "'IBM Plex Serif', serif" }}
                >
                  Student Registration
                </h1>
                <p className="text-white/50 text-[11px] tracking-widest uppercase mt-0.5">
                  Academic Enrollment Portal · 2026-27
                </p>
              </div>
            </div>
            <div className="mt-6 h-px bg-white/10" />
          </div>

          {/* ── ALERTS ───────────────────────────────────────────── */}
          {success && (
            <div className="mx-10 mt-6 px-4 py-3 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-sm font-medium">
              ✓ Registration submitted successfully. A confirmation email will be sent shortly.
            </div>
          )}
          {errors._api && (
            <div className="mx-10 mt-6 px-4 py-3 bg-red-50 border border-red-300 rounded text-red-700 text-sm">
              {errors._api}
            </div>
          )}

          {/* ════════════════════════════════════════════════
              SECTION 01 — Personal Information
          ════════════════════════════════════════════════ */}
          <Section title="Personal Information" num="01">

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

              <FormField label="Full Name" required error={errors.fullName}>
                <input
                  className={`rf-input w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("fullName")}`}
                  type="text" name="fullName" placeholder="e.g. Priya Sharma"
                  value={form.fullName} onChange={handleChange} onBlur={handleBlur}
                />
              </FormField>

              <FormField label="Email Address" required error={errors.email}>
                <input
                  className={`rf-input w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("email")}`}
                  type="email" name="email" placeholder="name@institution.edu"
                  value={form.email} onChange={handleChange} onBlur={handleBlur}
                />
                <p className="text-[11px] text-gray-400 mt-0.5">We'll use this for official communication.</p>
              </FormField>

            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mt-5">


              <FormField label="Phone Number" required error={errors.phone}>
                <div className="flex gap-2">
                  <select
                    className="rf-select h-10 px-2 text-sm bg-[#fafbfc] text-[#1a2535] border border-gray-300 rounded transition-all duration-150 shrink-0"
                    style={{ width: 112 }}
                    name="dialCode" value={form.dialCode} onChange={handleChange}
                  >
                    {DIAL_CODES.map((d) => <option key={d}>{d}</option>)}
                  </select>
                  <input
                    className={`rf-input flex-1 h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("phone")}`}
                    type="tel" name="phone" placeholder="9876543210"
                    value={form.phone} onChange={handleChange} onBlur={handleBlur}
                  />
                </div>
              </FormField>

            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mt-5">

              <FormField label="Date of Birth" required error={errors.dob}>
                <input
                  className={`rf-input w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("dob")}`}
                  type="date" name="dob"
                  value={form.dob} onChange={handleChange} onBlur={handleBlur}
                />
              </FormField>

              <FormField label="Gender" required error={errors.gender}>
                <div className="flex items-center gap-7 h-10">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                      <input
                        type="radio" name="gender" value={g}
                        checked={form.gender === g}
                        onChange={handleChange} onBlur={handleBlur}
                        className="accent-[#1d3461] w-4 h-4"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </FormField>

            </div>
          </Section>

          {/* ════════════════════════════════════════════════
              SECTION 02 — Background Details
          ════════════════════════════════════════════════ */}
          <Section title="Background Details" num="02">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">

              <FormField label="Religion" required error={errors.religion}>
                <select
                  className={`rf-select w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("religion")}`}
                  name="religion" value={form.religion} onChange={handleChange} onBlur={handleBlur}
                >
                  <option value="">Select Religion</option>
                  {RELIGIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </FormField>

              <FormField label="Category" required error={errors.category}>
                <select
                  className={`rf-select w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("category")}`}
                  name="category" value={form.category} onChange={handleChange} onBlur={handleBlur}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </FormField>

              <FormField label="Caste" error={errors.caste}>
                <input
                  className="rf-input w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border border-gray-300 rounded transition-all duration-150"
                  type="text" name="caste" placeholder="Enter caste (optional)"
                  value={form.caste} onChange={handleChange} onBlur={handleBlur}
                />
              </FormField>

            </div>
          </Section>

          {/* ════════════════════════════════════════════════
              SECTION 03 — Academic Information
          ════════════════════════════════════════════════ */}
          <Section title="Academic Information" num="03">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">

              <FormField label="Department" required error={errors.department}>
                <select
                  className={`rf-select w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("department")}`}
                  name="department" value={form.department} onChange={handleChange} onBlur={handleBlur}
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </FormField>

              <FormField label="Academic Year" required error={errors.year}>
                <select
                  className={`rf-select w-full h-10 px-3 text-sm bg-[#fafbfc] text-[#1a2535] border rounded transition-all duration-150 ${borderFor("year")}`}
                  name="year" value={form.year} onChange={handleChange} onBlur={handleBlur}
                >
                  <option value="">Select Year</option>
                  {YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
              </FormField>

            </div>
          </Section>

          {/* ════════════════════════════════════════════════
              SECTION 04 — Document Uploads
          ════════════════════════════════════════════════ */}
          <Section title="Document Uploads" num="04">
            <p className="text-xs text-gray-400 -mt-1 mb-4">
              Accepted formats: PDF, JPG &nbsp;·&nbsp; Maximum file size: 5 MB per document
            </p>
            <div className="flex flex-col gap-3">
              <UploadRow
                label="10th Grade Marksheet" required
                file={form.SSCMarksheet} error={errors.SSCMarksheet}
                onChange={(e) => handleFile(e, "SSCMarksheet")} id="file10"
              />
              <UploadRow
                label="12th Grade Marksheet" required
                file={form.HSCMarksheet} error={errors.HSCMarksheet}
                onChange={(e) => handleFile(e, "HSCMarksheet")} id="file12"
              />
            </div>
          </Section>

          {/* ── DECLARATION ──────────────────────────────────────── */}
          <div className="px-10 py-6 border-t border-gray-100">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => {
                  setDeclared(e.target.checked);
                  if (e.target.checked) setErrors((p) => ({ ...p, declared: undefined }));
                }}
                className="accent-[#1d3461] w-4 h-4 mt-0.5 shrink-0"
              />
              <span className="text-sm text-gray-500 leading-relaxed">
                I hereby declare that the information provided above is true and correct to the best of my knowledge
                and belief. I understand that providing false information may result in the rejection of my application.
              </span>
            </label>
            {errors.declared && (
              <p className="text-[11px] text-red-500 mt-1.5 ml-7">{errors.declared}</p>
            )}
          </div>

          {/* ── ACTION BUTTONS ───────────────────────────────────── */}
          <div className="px-10 py-5 bg-[#f8f9fb] border-t border-gray-100 flex justify-end items-center gap-3">
            <button
              type="button"
              className="rf-btn-draft h-9 px-5 text-sm font-medium text-gray-500 bg-[#eef0f3] border border-gray-300 rounded transition-all duration-150 cursor-pointer"
              onClick={() => alert("Draft saved locally.")}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="rf-btn-submit h-9 px-7 text-sm font-semibold text-white bg-[#1d3461] border-none rounded tracking-wide transition-all duration-150 cursor-pointer"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting…" : "Submit Registration"}
            </button>
          </div>

        </form>
      </div>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, num, children }) {
  return (
    <div className="px-10 py-8 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-bold tracking-widest text-[#1d3461] bg-[#eef2f9] px-2.5 py-1 rounded-sm">
          {num}
        </span>
        <h2 className="text-[13px] font-semibold text-[#1a2535] uppercase tracking-wider">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function FormField({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-gray-600 tracking-tight">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-500 mt-0.5 leading-tight">{error}</p>
      )}
    </div>
  );
}

function UploadRow({ label, required, file, error, onChange, id }) {
  return (
    <div>
      <div className="flex items-center justify-between px-5 py-3.5 border border-[#e5e9ef] rounded bg-[#fafbfc]">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12.5px] font-medium text-gray-600">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
          {file ? (
            <span className="text-xs text-emerald-700 font-medium">
              <span className="mr-1">✓</span>{file.name}
            </span>
          ) : (
            <span className="text-xs text-gray-400">No file selected — Accepted: PDF, JPG (Max 5MB)</span>
          )}
        </div>
        <label
          htmlFor={id}
          className="rf-upload-label cursor-pointer flex items-center h-8 px-4 text-xs font-medium text-[#1d3461] bg-[#eef2f9] border border-[#c8d5e8] rounded transition-all duration-150"
        >
          {file ? "Replace" : "Upload File"}
          <input id={id} type="file" accept=".pdf,.jpg,.jpeg" onChange={onChange} className="hidden" />
        </label>
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
}

