
exports.validateRegisterStudent = (data) => {
  const requiredFields = [
    { key: "fullName", message: "Full name is required." },
    { key: "email", message: "Email is required." },
    { key: "phone", message: "Phone number is required." },
    { key: "gender", message: "Gender is required." },
    { key: "dob", message: "Date of birth is required." },
    { key: "religion", message: "Religion is required." },
    { key: "category", message: "Category is required." },
    { key: "department", message: "Department is required." },
    { key: "year", message: "Academic year is required." },
    { key: "SSCMarksheet", message: "10th marksheet is required." },
    { key: "HSCMarksheet", message: "12th marksheet is required." },
  ];

  for (const field of requiredFields) {
    if (!data[field.key]) {
      return {
        required: true,
        message: field.message,
      };
    }
  }

  return {
    required: false,
    message: "All required fields are present.",
  };
};

