const mongoose = require('mongoose');

const NotificationData = mongoose.model('notifications');
const ResultsData = mongoose.model('results');
const TenthStudentRegistrationData = mongoose.model('10th students');
const NinethStudentRegistrationData = mongoose.model('9th students');
const AdminData = mongoose.model('adminLogins');
const BlogPost = mongoose.model('blogPosts');
const Feedback = mongoose.model('feedbacks');
const TestSeries = mongoose.model('testSeries');

 
module.exports = app =>{

  app.get('/api/getNotification', async(req, res) => {
    let Notifications = await NotificationData.find();
      res.send(Notifications);
 });
 
 app.get('/api/getResult', async(req, res) => {
   let results = await ResultsData.find();
     res.send(results);
 });
 
 app.get('/api/getAdmin', async(req, res) => {
   let admin = await AdminData.find();
     res.send(admin);
 });

 app.post('/api/setAdmin', async(req, res) => {
  let admin = await AdminData(req.body).save();
    res.send(admin);
});

 app.get('/api/getBlogPost', async(req, res) => {
   let blogpost = await BlogPost.find();
     res.send(blogpost);
 });
 
 app.get('/api/getFeedback', async(req, res) => {
   let reslt = await Feedback.find();
     res.send(reslt);
 });
 
 app.get('/api/get10thStudentsData', async(req, res) => {
   let students = await TenthStudentRegistrationData.find();
     res.send(students);
 });
 app.get('/api/get9thStudentsData', async(req, res) => {
   let students = await NinethStudentRegistrationData.find();
     res.send(students);
 });
 app.get('/api/getTestSeries', async(req, res) => {
  let test = await TestSeries.find();
    res.send(test);
});
 
 app.post('/api/deleteNotification/:id', async(req, res)=>{
     let deletedItem = await NotificationData.deleteOne({_id: req.params.id});
     res.send(deletedItem);
 });
 
 app.post('/api/deleteResult/:id', async(req, res)=>{
   let deletedItem = await ResultsData.deleteOne({_id: req.params.id});
   res.send(deletedItem);
 });
 
 app.post('/api/deleteBlogPost/:id', async(req, res)=>{
   let deletedItem = await BlogPost.deleteOne({_id: req.params.id});
   res.send(deletedItem);
 });
 
 app.post('/api/delete10ThStudent/:id', async(req, res)=>{
   let deletedItem = await TenthStudentRegistrationData.deleteOne({_id: req.params.id});
   res.send(deletedItem);
 });
 
 app.post('/api/deleteFeedback/:id', async(req, res)=>{
   let deletedItem = await Feedback.deleteOne({_id: req.params.id});
   res.send(deletedItem);
 });
 
 app.post('/api/delete9ThStudent/:id', async(req, res)=>{
   let deletedItem = await NinethStudentRegistrationData.deleteOne({_id: req.params.id});
   res.send(deletedItem);
 });

 app.post('/api/deleteTestSeries/:id', async(req, res)=>{
  let deletedItem = await TestSeries.deleteOne({_id: req.params.id});
  res.send(deletedItem);
});
 
 app.post('/api/editNotification/:id', async(req, res)=>{
   const id = {_id: req.params.id};
   let updatedItem = await NotificationData.replaceOne(id, req.body);
   res.send(updatedItem);
 });
 
 app.post('/api/editResult/:id', async(req, res)=>{
   const id = {_id: req.params.id};
   let updatedItem = await ResultsData.replaceOne(id, req.body);
   res.send(updatedItem);
 });
 
 app.post('/api/editTestSeries/:id', async(req, res)=>{
  const id = {_id: req.params.id};
  let updatedItem = await TestSeries.replaceOne(id, req.body);
  res.send(updatedItem);
});

 app.post('/api/editBlogPost/:id', async(req, res)=>{
   const id = {_id: req.params.id};
   let updatedItem = await BlogPost.replaceOne(id, req.body);
   res.send(updatedItem);
 });
 
 app.post('/api/editFeedback/:id', async(req, res)=>{
  const id = {_id: req.params.id};
  const updateItem={$set: {active: req.body.active }, $currentDate: { lastModified: true }}
  let updatedItem = await Feedback.updateOne(id, updateItem);
  res.send(updatedItem);
});

 app.post('/api/editAdminPassword/:id', async(req, res)=>{
   const id = {_id: req.params.id};
   const options = { upsert: true };
   const updateDoc = {$set: {password: req.body.password}};
   let updatedItem = await AdminData.updateOne(id, updateDoc, options);
   res.send(updatedItem);
 });
 
 app.post('/api/saveNotification', async(req, res) => {
     let user = await new NotificationData(req.body).save();
     res.send(user)
 });
 
 app.post('/api/saveResult', async(req, res) => {
   let user = await new ResultsData(req.body).save();
   res.send(user)
 });
 
 app.post('/api/saveStudentRegister', async(req, res) => {
   let user;
       req.body.class === "10" ? (
         user = await new TenthStudentRegistrationData(req.body).save()
       ) : (
         user = await new NinethStudentRegistrationData(req.body).save()
       );
   res.send(user)
 });
 
 
 app.post('/api/saveBlogPost', async(req, res) => {
   let user = await new BlogPost(req.body).save();
   res.send(user)
 });
 
 app.post('/api/saveFeedBack', async(req, res) => {
   let user = await new Feedback(req.body).save();
   res.send(user)
 });

 app.post('/api/saveTestSeries', async(req, res) => {
  let data = await new TestSeries(req.body).save();
  res.send(data)
});

}
