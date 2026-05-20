export const chunkText = (
  text,
  chunkSize = 6000
) => {

  const chunks = [];

  let index = 0;

  while (
    index < text.length
  ) {

    chunks.push(

      text.slice(
        index,
        index + chunkSize
      )
    );

    index += chunkSize;
  }

  return chunks;
};