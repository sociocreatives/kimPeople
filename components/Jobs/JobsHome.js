import { db } from "@/firebase";
import { collection, query, limit, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

export default function JobsHome() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    // 
    useEffect(() => {
        const fetchData = async () => {
            const collectionRef = collection(db, "jobs");
            const queryLimit = 8;
            const limitQuery = query(collectionRef, limit(queryLimit));

            try {
                const querySnapshot = await getDocs(limitQuery);
                const fetchData = [];
                querySnapshot.forEach((doc) => {
                    fetchData.push({ id: doc.id, ...doc.data(), timestamp: doc.data().timestamp?.toDate().getTime() });
                    console.log(fetchData);
                });
                setJobs(fetchData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

  return (
    <div className="category-section">
        <div className="category-content">
            <div className="category-left">
                <h1>Browse Open Jobs</h1>
                <p>See All</p>
            </div>
            <div className="category-below">
                <p>Looking for Open Job Opportunities? <span>View Categories </span></p>
            </div>
            {loading ? (
                            <Spinner/>
                        ) : (
                         <div className="category-cards" data-aos="zoom-in">
                                {jobs.map((item) => (
                            <div key={item.id} className="card">
                                <p>{item.job_title}</p>
                                <p>{item.budget}</p>
                                <p>{item.location}</p>
                                <p>{item.postedby}</p>
                                <p>{item.category}</p>                    
                            </div>
                            ))
                        }</div>
                        )} 
        </div>
    </div>
  )}