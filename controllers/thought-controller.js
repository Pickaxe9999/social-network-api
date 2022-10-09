const {Thought, User} = require('../model');

const thoughtController = {

    getAllThoughts(req, res){
        Thought.find({})
        .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getThoughtById({params}, res){
        Thought.findById({_id: params.id})
        .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No Thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch( err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    createThought({body}, res){
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    {$push: {thoughts: _id}},
                    {new: true, runValidators: true}
                )
            })
            .then(dbThoughtData => {
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbPizzaData => {
                if(!dbPizzaData){
                    res.status(404).json({message: 'No Thought found with this id!'});
                    return;
                }

                res.json(dbPizzaData)
            })
            .catch(err => res.status(400).json(err))
    },

    deleteThought({params, body}, res){
        Thought.findOneAndDelete({_id: params.id})
        .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No Thought found with this id!'});
                    return;
                }

                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'No pizza found with this id!'})
                    return;
                }

                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
    },

    removeReaction({ params,body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: body.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
}

module.exports = thoughtController;