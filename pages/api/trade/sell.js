export default async function handler(req, res) {
  const { coinId, quantity } = JSON.parse(req.body);
  const data = {
    coinId,
    quantity,
    currency: "usd",
    token: req.cookies.jwt,
  };
  try {
    const response = await fetch(process.env.MAIN_URL + "/sell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const result = await response.json();
    if (response.status == 400) {
      res.status(400).json(result);
      return;
    }
    res.status(200).json({
      msg: "success",
      transiction: { ...result["transiction"], createdAt: new Date() },
    });
  } catch (err) {
    res.status(404).json({ err: "something went wrong try again" });
  }
}
