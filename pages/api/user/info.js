export default async function infoHandler(req, res) {
  const data = {
    token: req.cookies.jwt,
  };
  try {
    const response = await fetch(process.env.MAIN_URL + "/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const result = await response.json();
    console.log(result);
    if (response.status == 400) {
      res.status(400).json({ err: "something went wrong try again" });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    // console.log(err);
    res.status(404).json({ err: "something went wrong try again" });
  }
}
