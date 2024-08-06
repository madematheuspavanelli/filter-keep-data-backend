import express, { Request, Response } from "express";
import cors from "cors";

interface Country {
  id: number;
  name: string;
}

interface Band {
  id: number;
  name: string;
  countryId: number;
}

const app = express();
const port = 3333;

app.use(cors());

const country_options: Country[] = [
  { id: 1, name: "USA" },
  { id: 2, name: "UK" },
  { id: 3, name: "Australia" },
  { id: 4, name: "Canada" },
  { id: 5, name: "Germany" },
];

const band_options: Band[] = [
  { id: 1, name: "The Who", countryId: 2 },
  { id: 2, name: "The Beatles", countryId: 2 },
  { id: 3, name: "The Rolling Stones", countryId: 2 },
  { id: 4, name: "The Doors", countryId: 1 },
  { id: 5, name: "The Kinks", countryId: 2 },
  { id: 6, name: "Led Zeppelin", countryId: 2 },
  { id: 7, name: "Pink Floyd", countryId: 2 },
  { id: 8, name: "Queen", countryId: 2 },
  { id: 9, name: "Nirvana", countryId: 1 },
  { id: 10, name: "Radiohead", countryId: 2 },
  { id: 11, name: "AC/DC", countryId: 3 },
  { id: 12, name: "INXS", countryId: 3 },
  { id: 13, name: "Midnight Oil", countryId: 3 },
  { id: 14, name: "Rush", countryId: 4 },
  { id: 15, name: "Arcade Fire", countryId: 4 },
  { id: 16, name: "The Tragically Hip", countryId: 4 },
  { id: 17, name: "Scorpions", countryId: 5 },
  { id: 18, name: "Rammstein", countryId: 5 },
  { id: 19, name: "Kraftwerk", countryId: 5 },
  { id: 20, name: "The Beach Boys", countryId: 1 },
  { id: 21, name: "Aerosmith", countryId: 1 },
];

app.get("/countries", (req: Request, res: Response) => {
  const { bandIds } = req.query;

  if (!bandIds) {
    return res.json(country_options);
  }

  const bandIdArray = (bandIds as string).split(",").map((id) => Number(id));
  const bandCountries = band_options
    .filter((band) => bandIdArray.includes(band.id))
    .map((band) => band.countryId);

  const uniqueCountryIds = [...new Set(bandCountries)];
  const filteredCountries = country_options.filter((country) =>
    uniqueCountryIds.includes(country.id)
  );

  res.json(filteredCountries);
});

app.get("/bands", (req: Request, res: Response) => {
  const { countryIds } = req.query;

  if (!countryIds) {
    return res.json(band_options);
  }

  const countryIdArray = (countryIds as string)
    .split(",")
    .map((id) => Number(id));
  const filteredBands = band_options.filter((band) =>
    countryIdArray.includes(band.countryId)
  );

  res.json(filteredBands);
});

app.get("/bands/details", (req: Request, res: Response) => {
  const { ids } = req.query;

  if (!ids) {
    return res.json(band_options);
  }

  const idArray =
    typeof ids === "string"
      ? ids.split(",").map((id) => Number(id))
      : Array.isArray(ids)
      ? ids.map((id) => Number(id))
      : [];

  // Filtra bandas com base nos IDs fornecidos
  const filteredBands = band_options.filter((band) =>
    idArray.includes(band.id)
  );

  res.json(filteredBands);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app };
