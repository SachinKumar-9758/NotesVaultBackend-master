const Notes=require('../models/notes');
const User=require('../models/user');
module.exports.getNotes = async(req, res)=>{
    console.log(req.id)
    const notes= await Notes.find({user:req.id});
    return res.json({success:true,notes:notes});
}
module.exports.addNote = async(req, res)=>{
    try{
        const note=await Notes.create({title:req.body.title,
        description:req.body.description,
        user:req.id});
        return res.json({
            success:true,
            message:"task created successfully",
            note:note,
        })
    }
    catch(err){
        console.log(err); 
    }
}
module.exports.updateNote = async(req, res)=> {
        const noteId = req.params.id;
        const updateData = req.body;
    
        try {
            // Check if the note with the given ID exists
            const existingNote = await Notes.findById(noteId);
    
            if (!existingNote) {
                return res.status(404).json({ success: false, message: 'Note not found' });
            }
            // Update the note with the provided data
            const updatedNote = await Notes.findByIdAndUpdate(noteId, updateData, { new: true });
                
            return res.json({ success: true, message: 'Note updated successfully', note: updatedNote });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    };
    module.exports.deleteNote = async(req, res)=> {
        const noteId = req.params.id;

        try {
            // Check if the note with the given ID exists
            const existingNote = await Notes.findById(noteId);
    
            if (!existingNote) {
                return res.status(404).json({ success: false, message: 'Note not found' });
            }
    
            // Delete the note with the provided ID
            await Notes.findByIdAndDelete(noteId);
    
            return res.json({ success: true, message: 'Note deleted successfully' });
        } 
        catch (error) {
            return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        }
    };