exports.checkData = (data, message) => {
  return async (req, res) => {
    try {
      if (!data) {
        return res.status(404).json({
          message: message,
        });
      }

      return true;
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

exports.checkExists = (data, message) => {
  return async (req, res) => {
    try {
      if (data) {
        return res.status(409).json({ message: message });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};
