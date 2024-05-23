import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './DiseaseDisplay.css'
import img1 from '../Assets/Diseaseinfo/1.JPG';
import img2 from '../Assets/Diseaseinfo/2.JPG';
import img3 from '../Assets/Diseaseinfo/3.JPG';
import img4 from '../Assets/Diseaseinfo/4.JPG';
import Recproducts from '../recproducts/Recproducts';
import CustomerSupportBanner from '../CustomerSupportBanner/CustomerSupportBanner';

const DiseaseDisplay = () => {
  const { preResult } = useContext(ShopContext); 
  return (
    <div className="blog-container">
    {/* Heading */}
    <h1>Tomato Plant with Late Blight</h1>

    <div className="section">
        <h2>Introduction</h2>
        <p>Late blight, caused by the fungus Phytophthora infestans, is one of the most destructive diseases affecting tomato plants worldwide. It can lead to significant yield losses if not managed effectively. Understanding the symptoms, causes, and preventive measures against late blight is crucial for tomato growers to protect their crops and ensure a successful harvest.</p>
    </div>

    {/* Picture Gallery (Horizontal Scroll for Mobile View) */}
    <div className="picture-gallery">
      <img src={img1} alt="Image 1" />
      <img src={img2} alt="Image 2" />
      <img src={img3} alt="Image 3" />
      <img src={img4} alt="Image 4" />
    </div>

    {/* Disease Info */}
    <div className="section">
      <h2>Disease Symptoms</h2>
      <p>Leaf Lesions: The first signs of late blight are typically dark, water-soaked lesions on the leaves, often surrounded by a yellow halo.</p>
<p>Stem Lesions: As the disease progresses, dark lesions may also appear on the stems of the tomato plant.
</p><p>Fruit Rot: Infected fruits develop dark, sunken lesions with a fuzzy texture, often starting from the stem end.</p>
    </div>

    {/* Precautions */}
    <div className="section">
      <h2>Precautions</h2>
      <p>Crop Rotation: Rotate tomato crops with non-host plants to reduce the buildup of Phytophthora infestans in the soil.</p>
      <p>Fungicide Application: Apply fungicides preventively, especially during periods of high disease pressure. Copper-based fungicides are commonly used to manage late blight.</p>
      <p>Sanitation: Remove and destroy infected plant material to prevent the spread of the disease. Avoid working in the garden when foliage is wet to minimize spreading spores.</p>
      <p>Resistant Varieties: Choose tomato varieties with genetic resistance to late blight when available. These varieties offer increased protection against the disease.</p>
      <p>Proper Plant Spacing: Maintain adequate spacing between tomato plants to improve air circulation and reduce humidity around foliage, minimizing conditions favorable for late blight development.</p>
    </div>

    {/* Recommended Products */}
    <div className="section">
      
    {preResult &&  (
        console.log('predictionResult:', preResult),
        console.log('predictionResult.disease_info.product:', preResult && preResult.disease_info && preResult.disease_info.product),
        <Recproducts cat={preResult.disease_info.product} />
      )}
    </div>
    <CustomerSupportBanner/>
  </div>
  )
}

export default DiseaseDisplay