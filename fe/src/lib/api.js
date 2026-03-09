import axiosInstance from "./axios";

  try {
      const res = await axiosInstance.post(`${data.loginUser}/login`, {
       data.email, data.password
      });

      const result =  res.data;

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
      } else {
        setSuccess("Login successful! Redirecting to your library…");
        if (data.token) localStorage.setItem("token", data.token);
        navigate(`${data.path}`)
        // TODO: navigate("/dashboard") — add React Router if needed
      }
    } catch {
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }