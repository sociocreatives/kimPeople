
import { db } from "@/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";


async function fetchDataFromCategories() {
    const QuerySnapshot = await getDocs(collection(db, "categories"));

    const data = [];
    QuerySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()});
        console.log(data);
    });
    return data;
    }

export default function PremiumHeader() { 
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchCategories() {
            const data = await fetchDataFromCategories();
            setCategories(data);
        }
        fetchCategories();
    }, []);

  return (
        <div>
            <div className="category-section">
                <div className="category-content">
                    <div className="category-left">
                        <h1>Browse Jobs By Categories</h1>
                        <p>See All</p>
                    </div>
                    <div className="category-below">
                        <p>Looking for Open Job Opportunities? <span>Find Jobs </span></p>
                    </div>
                    <div className="category-cards">
                        {categories.map((category) => (
                            <div key={category.id} className="card">
                                {category.category_name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}
