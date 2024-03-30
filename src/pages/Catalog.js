import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConector';
import { categories } from '../services/apis';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { getCatalogPageData } from '../services/operations/PageAndComponentData';
import CourseCard from '../components/core/Catalog/CourseCard';

export default function Catalog() {

   const {catalogName} = useParams();
   const [catalogPageData, setCatalogPageData] = useState(null);
   const [categoryId, setCategoryId] = useState("");
   const [active, setActive] = useState(1);
   
   // Fetch All categories
   useEffect(() => {
    const getCategories = async () => {
        const response = await apiConnector("GET", categories.CATEGORIES_API);
        
        const category_id = response?.data?.data.filter((category) => category.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

        setCategoryId(category_id);
    }

    getCategories();

   },[catalogName])


   useEffect(() => {
    const getCategoryDetails = async () => {
        try {
            const response = await getCatalogPageData(categoryId);
            setCatalogPageData(response)
        } catch (error) {
            console.log(error);
        }
    }

    if(categoryId){
        getCategoryDetails();
    }
   },[categoryId])

   return (
    <>
      <div className='box-content bg-richblack-800 px-4'>
        {/* Section 1 */}
        <div className='mx-auto flex min-h-[260px] lg:max-w-maxContent flex-col justify-center gap-4'>
            <p className='text-sm text-richblack-300'>
              {`Home / Catalog / `}
              <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span>
            </p>
            <p className='text-3xl text-richblack-5'>
                {catalogPageData?.data?.selectedCategory?.name}
            </p>
            <p className='max-w-[870px] text-richblack-200'>
                {catalogPageData?.data?.selectedCategory?.description}
            </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className='mx-auto box-content w-full lg:max-w-maxContent px-4 py-12'>
        {/* Sub - Sec - 1 */}
        <p className='sm:text-4xl text-3xl text-richblack-5 font-semibold'>
            Courses to get you started
        </p>

        <div className='my-4 flex border-b border-b-richblack-600 text-sm'>
            <p className={`px-4 py-2 cursor-pointer ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`}
            onClick={() => setActive(1)}>
                Most Popular
            </p>
            <p className={`px-4 py-2 cursor-pointer ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"}`}
            onClick={() => setActive(2)}>
                New
            </p>
        </div>

        <div className='mr-8 xl:mr-0'>
            <CourseSlider courses={catalogPageData?.data?.selectedCategory?.courses}/>
        </div>
      </div>

      {/* Sub - Sec - 2 */}
      <div className='mx-auto box-content w-full  lg:max-w-maxContent px-4 py-12'>
        <p className='sm:text-4xl text-3xl text-richblack-5 font-semibold'>
            Top Courses in {catalogPageData?.data?.differentCategory?.[0].name}
        </p>
        <div className='py-8 mr-8 xl:mr-0'>
            <CourseSlider courses={catalogPageData?.data?.differentCategory?.[0]?.courses}/>
        </div>
      </div>

      {/* Sub - Sec - 3 */}
      <div className='mx-auto lg:max-w-maxContent box-content w-full px-4 py-12'>
        <div className='sm:text-4xl text-3xl text-richblack-5 font-semibold'>
            Frequently Bought
        </div>
        <div className='py-8 mr-8 xl:mr-0'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                    <CourseCard course={course} key={index} Height={"h-[400px]"} />
                ))}
            </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  )
}
