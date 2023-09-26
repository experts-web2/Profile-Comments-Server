const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  FAILED: "failed",
};

const STATUS_CODE = {
  INTERVAL_SERVER_ERROR: 500,
  SUCCESS: 200,
  NOT_FOUND: 404,
  SERVER_CANNOT_PROCESS: 400,
  CREATED: 201
}

module.exports = { STATUS, STATUS_CODE };
