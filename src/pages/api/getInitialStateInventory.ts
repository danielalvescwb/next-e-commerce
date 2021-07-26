import inventory from '../../data/initialInventory.json'
export default function handler(req, res) {
  res.status(200).json(inventory)
}
