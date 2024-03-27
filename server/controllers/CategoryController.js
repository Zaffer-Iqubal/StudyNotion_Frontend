const Category = require('../models/Category');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Create category
exports.createCategory = async(req, res) => {
    try {
        //Get Data from req.body
        const {name, description} = req.body;

        //Validation of Input Field
        if(!name || !description){
            return res.status(403).json({
                success: false,
                error: 'Please fill all fields'
            });
        }

        // Save the Tags in DataBase
        const newCategory = await Category.create({name, description});
        return res.status(201).json({
            success: true,
            data: newCategory,
            message: 'Category create successfully.'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Get all category
exports.showAllCategories = async(req, res) => {
    try {
        //Get all Tags
        const allCategorys = await Category.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            data: allCategorys,
            message: 'All Category returned successfully.'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// category page details
exports.categoryPageDetails = async (req, res) => {
    try {
      // get category ID
      const { categoryId } = req.body;
  
      // get courses for specified course ID
      const selectedCategory = await Category.findById({ _id: categoryId })
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec();
  
      // validation
      if (!selectedCategory) {
        return res.status(404).json({
          success: false,
          message: "data not found",
        });
      }
  
      // get courses for different categories
      const differentCategoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
        .populate("courses")
        .exec();
  
      // Randomly select one category from all the categories except selected one
      let differentCategory = await Category.find(
        differentCategoriesExceptSelected[
          getRandomInt(differentCategoriesExceptSelected.length)
        ]._id
      )
        .populate({ path: "courses", match: { status: "Published" } })
        .exec();
  
      // get top selling courses
      // Step 1: get all the categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
          },
        })
        .exec();
  
      // Step 2: get all the courses from all the categories in a single array
      const allCourses = allCategories.flatMap((category) => category.courses);
  
      // Step 3: find the top selling courses
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
  
      // return
      return res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "error occured while fetching category page detaills",
        error: error.message,
      });
    }
  };