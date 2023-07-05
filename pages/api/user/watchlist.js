export default async function handler(req, res) {
  const { coinId, type } = req.body;
  const data = {
    coinId,
    type,
    token: req.cookies.jwt,
  };
  try {
    const response = await fetch(process.env.MAIN_URL + "/update/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const result = await response.json();
    if (response.status == 400) {
      res.status(400).json({ err: "something went wrong try again" });
      return;
    }
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(404).json({ err: "something went wrong try again" });
  }
}
