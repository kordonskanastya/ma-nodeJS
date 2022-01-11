function exit (field) {
  console.error(`Can't working without value for field: ${field}`);
  process.exit(1);
}

module.exports = {
  exit
};
