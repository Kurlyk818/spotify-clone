import {Song} from '../models/song.model.js';

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({createdAt: -1});
        res.json(songs)


    } catch (err) {
        console.log('Error in getAllSongs', err);
        next(err);
        
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    try {
        //fetch 6 random songs using aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 6}
        },{
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audioUrl: 1,
            }
        }
        ])
        
        res.json(songs)

    } catch (err) {
        log('Error in getFeaturedSongs', err);
        next(err)
    }
}

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        //fetch 6 random songs using aggregate pipeline
        const songs = await Song.aggregate([
            {$sample: {size: 4}
        },{
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUrl: 1,
                audioUrl: 1,
            }
        }
        ])
        
        res.json(songs)

    } catch (err) {
        log('Error in getMadeForYouSongs', err);
        next(err)
    }
}
export const getTrendingSongs = async (req, res, next) => {
    try {
		const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
}