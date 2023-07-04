export default async function handler(req, res) {
  // we can add a loader
  try {
    const response = await fetch(process.env.MAIN_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });
    const result = await response.json();
    if (response.status == 403) {
      res.status(403).json({ invalidUserName: true });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(404).json({ err: err });
  }
}
