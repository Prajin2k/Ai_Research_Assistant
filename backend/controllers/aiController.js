import Upload from "../models/Upload.js";
import { chunkText }
from "../services/chunkService.js";
import {
  generateAISummary,
} from "../services/aiService.js";

export const generateSummary = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const upload =
      await Upload.findById(id);

    if (!upload) {

      return res.status(404).json({
        message: "PDF not found",
      });
    }
    if (upload.summary) {

  console.log(
    "Using cached summary"
  );

  return res.status(200).json({

    summary:
      upload.summary,
  });
}
    const chunks =
      chunkText(
        upload.extractedText
      );

    console.log(
      "Total Chunks:",
      chunks.length
    );

   

   const batchSize = 2;

let summaries = [];

for (
  let i = 0;
  i < chunks.length;
  i += batchSize
) {

  const batch =

    chunks.slice(
      i,
      i + batchSize
    );

  console.log(

    `Processing batch ${
      i / batchSize + 1
    }`
  );

  const batchResults =

    await Promise.all(

      batch.map(
        async (chunk) => {

          if (
            !chunk ||
            chunk.length < 100
          ) return "";

          try {

            return await generateAISummary(
              chunk
            );

          } catch (error) {

            console.log(

  "Chunk failed:",

  error.response?.data ||

  error.message
);

            return "";
          }
        }
      )
    );

  summaries.push(
    ...batchResults
  );
  await new Promise(
  (resolve) =>

    setTimeout(
      resolve,
      1500    )
);
    }

    const groupedSummaries = [];

for (
  let i = 0;
  i < summaries.length;
  i += 10
) {

  const group =

    summaries
      .slice(i, i + 10)
      .join("\n");

  const compressed =

    await generateAISummary(
      group
    );

  groupedSummaries.push(
    compressed
  );
}

const combinedSummary =

  groupedSummaries.join("\n");

    const finalChunks =
      chunkText(
        combinedSummary,
        5000
      );

    let finalSummary = "";

    for (
      const chunk of finalChunks
    ) {

      const refined =
        await generateAISummary(
          chunk
        );

      finalSummary +=
        refined + "\n";
    }

    upload.summary =
      finalSummary;

    await upload.save();

    res.status(200).json({

      summary:
        finalSummary,
    });
    } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        error.message,
    });
  }
};