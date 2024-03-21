const response = (
  data = "",
  status = { code: "", message: "" },
  error = null,
  message = null
) => {
  return {
    status: status.code,
    error: error,
    message: message ? message : status.message,
    data: data,
  };
};

const status = {
  success_status: {
    code: "AP200",
    message: "Record retrive successfully.",
  },
  created_status: {
    code: "AP201",
    message: "Record created successfully",
  },
  client_error_status: {
    code: "AP400",
    message: "Bad Request",
  },
  not_found_error_status: {
    code: "AP404",
    message: "Data not found",
  },
  error_status: {
    code: "AP500",
    message: "Server Error",
  }
};

module.exports = { response, status };
