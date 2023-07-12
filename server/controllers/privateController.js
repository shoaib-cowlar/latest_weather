exports.getAdmin = async (req, res) => {
  try {
    res.status(200).json("ACCESSED TO ADMIN ROUTE");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
