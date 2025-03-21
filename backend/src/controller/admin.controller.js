import {Song} from '../models/song.model.js'
import {Album} from '../models/album.model.js'
import cloudinary from '../lib/cloudinary.js'

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto'
        })
        return result.secure_url
    } catch (err) {
        console.log('Error in uploadToCloudinary', err);
        throw new Error('Could not upload file to cloudinary')
        

    }
}


export const createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: 'Please provide an audio file and an image file'})
        }

        const {title, artist, albumId, duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save()

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id},
            })
        }

        res.status(201).json(song)

    } catch (err) {
        console.log('Error in createSong', err)
        next(err)
    }
}


export const deleteSong = async (req, res, next) => {
    try {
        const {id} = req.params

        const song = await Song.findById(id)

        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id}
            })
        }

        await Song.findByIdAndDelete(id)
        res.status(200).json({message: 'Song deleted successfully'})

    } catch (err) {
        console.log('Error in deleteSong', err)
        next(err);
        
    }
}

export const createAlbum = async (req, res, next) => {
try {
    const {title, artist, releaseYear} = req.body
    const imageFile = req.files.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile)

    const album = new Album({
        title: title,
        artist:artist,
        releaseYear : releaseYear,
        imageUrl: imageUrl,
    })

    await album.save()
    res.status(201).json(album)

} catch (err) {
    console.log('Error in createAlbum', err);
    next(err)
}
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const {id} = req.params
        await Song.deleteMany({albumId: id})
        await Album.findByIdAndDelete(id)
        res.status(200).json({message: 'Album deleted successfully'})
    } catch (err) {
        log('Error in deleteAlbum', err)
        next(err)
    }
}

export const checkAdmin = (req, res) => {
    res.status(200).json({isAdmin: true })
}