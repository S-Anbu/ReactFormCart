import React, { useState, useRef } from 'react';

const FormCart = () => {
    const [titleValue, setTitleValue] = useState("");
    const [error, setError] = useState("");

    const handleChangetitle = (e) => {
        const value = e.target.value;
        setTitleValue(value);
        if (value.length >= 3) {
            setError("");
        } else {
            setError("Input must be at least 3 Characters.");
        }
    };

    const [descValue, setDescValue] = useState("");
    const [errore, setErrore] = useState("");

    const handleChangeDesc = (e) => {
        const value = e.target.value;
        setDescValue(value);
        if (value.length >= 10) {
            setErrore("");
        } else {
            setErrore("Input must be at least 10 Characters.");
        }
    };

    const [thumValue, setThumValue] = useState(null);
    const thumInputRef = useRef(null);
    const [errorThum, setErrorThum] = useState("");
    const handleChangeThum = (e) => {
        const file = e.target.files[0];
        setThumValue(file);
        if (file && file.type.startsWith("image/")) {
            setErrorThum("");
        } else {
            setErrorThum("Input must be an image file (JPEG, PNG).");
            e.target.value = null;
        }
    };

    const [mainImages, setMainImages] = useState([]);
    const mainImagesInputRef = useRef(null);
    const [errorMainImages, setErrorMainImages] = useState("");
    const handleChangeMainImages = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 3) {
            setMainImages(files);
            setErrorMainImages("");
        } else {
            setErrorMainImages("Please upload exactly 3 images.");
            e.target.value = "";
        }
    };

    const [category, setCategory] = useState('');
    const handleCategoryChange = (e) => setCategory(e.target.value);

    const [stock, setStock] = useState(0);
    const handleStockChange = (e) => setStock(e.target.value);

    const [weight, setWeight] = useState(0);
    const handleWeightChange = (e) => setWeight(e.target.value);

    const [priceFields, setPriceFields] = useState([{ countryName: '', countryCode: '', price: '' }]);
    const handlePriceChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPriceFields = [...priceFields];
        updatedPriceFields[index][name] = value;
        setPriceFields(updatedPriceFields);
    };
    const addPriceField = () => {
        setPriceFields([...priceFields, { countryName: '', countryCode: '', price: '' }]);
    };

    const [nutritionValues, setNutritionValues] = useState([{ name: '', amount: '', unit: '' }]);
    const handleNutritionChange = (e, index) => {
        const { name, value } = e.target;
        const updatedNutritionValues = [...nutritionValues];
        updatedNutritionValues[index][name] = value;
        setNutritionValues(updatedNutritionValues);
    };
    const addNutritionValue = () => {
        setNutritionValues([...nutritionValues, { name: '', amount: '', unit: '' }]);
    };

    const [specifications, setSpecifications] = useState([{ name: '', value: '' }]);
    const handleSpecificationChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSpecifications = [...specifications];
        updatedSpecifications[index][name] = value;
        setSpecifications(updatedSpecifications);
    };
    const addSpecification = () => {
        setSpecifications([...specifications, { name: '', value: '' }]);
    };

    const [cart, setCart] = useState([]);

    const handleDelete = (index) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        const product = cart[index];
        setTitleValue(product.title);
        setDescValue(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setWeight(product.weight);
        setPriceFields(product.priceFields);
        setNutritionValues(product.nutritionValues);
        setSpecifications(product.specifications);
        setCart(cart.filter((_, i) => i !== index)); //Remove item from cart
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (error || errore || errorThum || errorMainImages) {
            alert("Please resolve all errors before submitting the form.");
            return; // Prevent form submission
        }
        const thumbnailUrl = thumValue ? URL.createObjectURL(thumValue) : null;
        const mainImageUrls = mainImages.map(file => URL.createObjectURL(file));

        const newProduct = {
            title: titleValue,
            description: descValue,
            thumbnail: thumbnailUrl,
            mainImages: mainImageUrls,
            category: category,
            priceFields,
            nutritionValues,
            specifications,
            stock,
            weight,
        };
        console.log(newProduct);
        setCart([...cart, newProduct]);

        // Clear form fields
        setTitleValue('');
        setDescValue('');
        setThumValue(null);
        setMainImages([]);
        setCategory('');
        setStock(0);
        setWeight(0);
        setPriceFields([{ countryName: '', countryCode: '', price: '' }]);
        setNutritionValues([{ name: '', amount: '', unit: '' }]);
        setSpecifications([{ name: '', value: '' }]);

        if (thumInputRef.current) thumInputRef.current.value = null;
        if (mainImagesInputRef.current) mainImagesInputRef.current.value = null;
    };

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12'>
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-center bg-orange-500 rounded p-2 text-white mb-6">Add Product</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-6'>
                    <label htmlFor="Title">Title</label>
                    <input id='Title' className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" type="text" value={titleValue} onChange={handleChangetitle} placeholder='Enter the Product Title' required />
                    {error && <p className='text-red-600'>{error}</p>}

                    <label htmlFor="Description">Description</label>
                    <textarea id="Description" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" rows="3" cols="30" value={descValue} onChange={handleChangeDesc} placeholder='Enter the Product description' required></textarea>
                    {errore && <p className='text-red-600'>{errore}</p>}
                    <div className='flex space-x-4'>
                        <div >
                            <label htmlFor="Thumbnail Image">Thumbnail Image</label>
                            <input type="file" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" id="Thumbnail Image" accept="image/*" ref={thumInputRef} onChange={handleChangeThum} required />
                            {errorThum && <p className='text-red-600'>{errorThum}</p>}
                        </div>
                        <div>
                            <label htmlFor="Main Images">Main Images</label>
                            <input type="file" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" id="Main Images" accept="image/*" ref={mainImagesInputRef} multiple onChange={handleChangeMainImages} required />
                            {errorMainImages && <p className='text-red-600'>{errorMainImages}</p>}
                        </div>
                    </div>
                    <div className='flex space-x-4 '>
                        <div>
                            <label htmlFor="Category">Category:</label>
                            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" id="Category" value={category} onChange={handleCategoryChange} required>
                                <option value="">Select</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home">Home</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="Stock">Stock:</label>
                            <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" id="Stock" min={0} value={stock} onChange={handleStockChange} required />
                        </div>
                        <div>
                            <label htmlFor="Weight in Grams">Weight in Grams:</label>
                            <input type="number" id="Weight in Grams" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1" min={0} value={weight} onChange={handleWeightChange} required />
                        </div>
                    </div>

                    <h1 className='text-xl font-bold'>Price</h1>
                    {priceFields.map((field, index) => (
                        <div key={index} className='flex items-center space-x-3 border p-5'>
                            <label htmlFor="Country Name">Country Name:</label>
                            <input type="text" name="countryName" value={field.countryName} onChange={(e) => handlePriceChange(e, index)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1"
                                placeholder="Country Name" />

                            <label htmlFor="Currency Code">Currency Code:</label>
                            <input type="text" name="countryCode" value={field.countryCode}
                                onChange={(e) => handlePriceChange(e, index)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1"
                                placeholder=' e.g., "$", "₹"' />

                            <label htmlFor="Price">Price</label>
                            <input type="number" name="price" value={field.price}
                                onChange={(e) => handlePriceChange(e, index)}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none mt-1"
                                placeholder="Price" min="0" />
                        </div>
                    ))}
                    <button type="button" onClick={addPriceField}
                        className="bg-slate-500 text-white px-4 py-2 w-fit rounded font-bold hover:bg-blue-600 transition duration-300 mt-4" >
                        Add Price Field</button>

                    <h1 className='text-xl font-bold'>Nutrition Values</h1>
                    {nutritionValues.map((value, index) => (
                        <div key={index} className='flex items-center space-x-3 border p-5 w-fit'>
                            <label htmlFor="Nutrition Name">Name:</label>
                            <input type="text" name="name" value={value.name}
                                onChange={(e) => handleNutritionChange(e, index)}
                                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none "
                                placeholder="e.g., Protein" />

                            <label htmlFor="Amount">Amount</label>
                            <input type="number" name="amount" value={value.amount} min={0}
                                onChange={(e) => handleNutritionChange(e, index)}
                                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none "
                                placeholder='e.g., "50"' />

                            <label htmlFor="Unit">Unit</label>
                            <input type="text" name="unit" value={value.unit}
                             onChange={(e) => handleNutritionChange(e, index)} 
                             className=" p-1 border border-gray-300 rounded"
                              placeholder='e.g., "Grams","Kg"' />
                        </div>
                    ))}
                    <button type="button" onClick={addNutritionValue} className='font-bold bg-slate-500 text-white px-4 py-2 rounded w-fit'>Add Nutrition Value</button>

                    <h1 className='text-xl font-bold'>Specifications</h1>
                    {specifications.map((spec, index) => (
                        <div key={index} className='flex items-center space-x-3 border p-5 '>
                            <label htmlFor="Specification Name">Name:</label>
                            <input type="text" name="name" value={spec.name}
                                onChange={(e) => handleSpecificationChange(e, index)}
                                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none "
                                placeholder='e.g., "Color","Brand", "model" ' />

                            <label htmlFor="Specification Value">Value</label>
                            <input type="text" name="value" value={spec.value}
                                onChange={(e) => handleSpecificationChange(e, index)}
                                className="w-full p-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none "
                                placeholder='e.g., "Black", "Sony","Full HD"' />
                        </div>
                    ))}
                    <button type="button" onClick={addSpecification} className='font-bold bg-slate-500 text-white px-4 py-2 rounded w-fit'>Add Specification</button>

                    <button type="submit" className='font-bold bg-orange-500 text-white mx-auto px-10 py-2 rounded w-fit'>Add To Cart</button>
                </form>

                {/* Cart Section */}
                <div className='mt-10'>
                    <h2 className='text-2xl font-bold mb-4'>Cart</h2>
                    {cart.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {cart.map((product, index) => (
                                <div key={index} className="p-6 bg-white shadow-md rounded-lg">
                                    {/* Product Thumbnail */}
                                    {product.thumbnail && (
                                        <img src={product.thumbnail} alt="Thumbnail" className="w-full h-40 object-cover rounded-md" />
                                    )}
                                    <div className="mt-4">
                                        <h3 className="text-lg font-semibold uppercase">{product.title}</h3>
                                        <p className="text-gray-600">{product.description}</p>
                                    </div>
                                    <div className="mt-4 ">
                                        <span className=" font-semibold text-gray-500">Category:</span>
                                        <span className="text-sm font-medium text-gray-700"> {product.category}</span>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className=" font-semibold text-gray-500">Stock:</span>
                                        <span className="text-sm font-medium text-gray-700">{product.stock} Unit</span>
                                    </div>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className=" font-semibold text-gray-500">Weight:</span>
                                        <span className="text-sm font-medium text-gray-700">{product.weight} grams</span>
                                    </div>

                                    {/* Price Fields */}
                                    <div className="mt-4 flex justify-between items-center">
                                        <h4 className="font-semibold text-sm text-gray-600">Price:</h4>
                                        <ul className="space-y-1">
                                            {product.priceFields.map((price, i) => (
                                                <li key={i} className="text-sm text-gray-700 uppercase">
                                                    {price.countryName} ({price.countryCode}): {price.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Nutrition Values */}
                                    
                                    <div className="mt-4 flex justify-between items-center">
                                        <h4 className="font-semibold text-sm text-gray-600">Nutrition Values:</h4>
                                        <ul className="space-y-1">
                                            {product.nutritionValues.map((nutrition, i) => (
                                                <li key={i} className="text-sm text-gray-700">
                                                    {nutrition.name}: {nutrition.amount} {nutrition.unit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Specifications */}
                                    <div className="mt-4 flex justify-between items-center">
                                        <h4 className="font-semibold text-sm text-gray-600">Specifications:</h4>
                                        <ul className="space-y-1">
                                            {product.specifications.map((spec, i) => (
                                                <li key={i} className="text-sm text-gray-700 uppercase">
                                                    {spec.name}: {spec.value}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Main Images */}
                                    <div className="mt-4 grid grid-cols-3 gap-2">
                                        {product.mainImages.map((image, i) => (
                                            <img key={i} src={image} alt={`Main ${i + 1}`} className="w-full h-20 object-cover rounded-md" />
                                        ))}
                                    </div>
                                    {/* Edit and Delete Buttons */}
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No products in cart.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default FormCart;
