import { testImage } from "./test-image";

export async function annotateImage(sourceImage) {
  console.log(`Source image here: ${sourceImage}`);
  let postData = {
    requests: [
      {
        image: {
          // The source image needs to be a base64 encoded string
          // content: testImage,
          content: sourceImage,
        },
        features: [
          {
            type: "LABEL_DETECTION",
            maxResults: 3,
            model: "builtin/latest",
          },
          {
            type: "TEXT_DETECTION",
            maxResults: 1,
            model: "builtin/latest",
          },
          {
            type: "FACE_DETECTION",
            maxResults: 1,
            model: "builtin/latest",
          },
          {
            type: "LANDMARK_DETECTION",
            maxResults: 10,
            model: "builtin/latest",
          },
          {
            type: "LOGO_DETECTION",
            maxResults: 10,
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
    console.error("A required environment variable was not set.");
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
    console.log(result.error);

    if (!response.ok) {
      throw new Error(`An error occured with the Vision API: ${result.error.message}`);
    }
    console.log("Success:", result);
    return JSON.stringify(result.responses);
  } catch (fetchError) {
    throw fetchError;
  }
}
