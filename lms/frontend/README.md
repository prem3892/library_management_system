appId =  672388a94a7edf80fc5bf4e1

create_facultyAPi =  http://localhost:8585/admin/672388a94a7edf80fc5bf4e1/createFaculty
login_faculty =  http://localhost:8585/login
faculty profile =  http://localhost:8585/faculty/faculty.jpg;



courseTitle, courseContent, facultyId, author =  req.body;
     coursePdf 

create card api =  http://localhost:8585/faculty/:id/add-course

get cards by admin  =  http://localhost:8585/672388a94a7edf80fc5bf4e1/getCourse


<!-- login  or delete faculty toke varify  -->
<!-- app.delete('/faculty/:id', authenticate, async (req, res) => {
  try {
    const facultyId = req.params.id;
    await Faculty.deleteOne({ _id: facultyId });
    res.json({ message: 'Faculty member deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Error deleting faculty member' });
  }
}); -->

<!-- token  -->


<!-- const authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

app.use(authenticate); // Apply middleware to protected routes -->

