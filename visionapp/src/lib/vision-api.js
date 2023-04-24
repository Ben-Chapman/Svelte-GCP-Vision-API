import { tableRowData } from "./stores";

export async function annotateImage(sourceImage) {
  let postData = {
    requests: [
      {
        image: {
          // The source image needs to be a base64 encoded string
          content: sourceImage,
        },
        features: [
          {
            type: "LABEL_DETECTION",
            maxResults: 50,
            model: "builtin/latest",
          },
          {
            type: "LANDMARK_DETECTION",
            maxResults: 50,
            model: "builtin/latest",
          },
          {
            type: "LOGO_DETECTION",
            maxResults: 50,
            model: "builtin/latest",
          },
        ],
      },
    ],
  };

  const visionApiUrl = "https://vision.googleapis.com/v1/images:annotate";

  try {
    // Ensure an env variable was set, containing the GCP auth token
    var authToken = import.meta.env.VITE_AUTH_TOKEN;
    var gcpBillingProject = import.meta.env.VITE_GCP_BILLING_PROJECT;
  } catch (envVarError) {
    const envVarErrorMessage =
      "A required environment variable was not set. \
    Refer to the documentation for further information";
    console.error(envVarErrorMessage);
  }
  try {
    const response = await fetch(visionApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-User-Project": gcpBillingProject,
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(postData),
    });

    const result = await response.json();

    if (!response.ok) {
      const responseErrorMessage = `An error occured with the Vision API: \
      ${result.error.message}`;
      throw new Error(responseErrorMessage);
    }

    processResults(result);
  } catch (fetchError) {
    throw fetchError;
  }
}

/**
 * @param {Object} annotationResult Process the results from a Vision API
 * annotation request, transforming into the expected format for Svelte Tables:
 * const rows = [{key1: "value 1", key2: "value 2"}]
 */
function processResults(annotationResult) {
  const responses = annotationResult.responses[0];
  const rows = [];

  Object.keys(responses).forEach((key) => {
    responses[key].forEach((item) => {
      const desc = item?.description;
      const score = Math.ceil(item.score * 100); // 93.09875434 -> 93
      rows.push({
        description: desc,
        confidence: score,
      });
      console.log(`${desc} - ${score}% confident`);
    });
  });
  tableRowData.set(rows);
}
