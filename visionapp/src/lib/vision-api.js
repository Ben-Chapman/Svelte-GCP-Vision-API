import vision from '@google-cloud/vision';

export async function processImage() {
	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	// Performs label detection on the image file
	const [result] = await client.labelDetection('/home/benchapman/Downloads/nyc.jpg');
	const labels = result.labelAnnotations;
	console.log('Labels:');
	labels.forEach((label) => console.log(label.description));
	return labels;
}

// processImage();
