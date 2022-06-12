import Image from "../models/imageModel.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors.js";

export const createImage = async (req, res) => {
  let { name, album, photo } = req.body;

  if (!name || !photo) {
    throw new BadRequestError("Please provide all the required fields");
  }

  req.body.creator = req.user.userId;

  const image = await Image.create(req.body);
  res.status(201).json({ image });
};

export const getAllImages = async (req, res) => {
  const { album } = req.query;
  let queryObject = {};
  if (album) {
    queryObject.album = { $regex: album, $options: "i" };
  }

  let images = await Image.find(queryObject);
  images = await images.filter(
    (image) => String(image.creator) === String(req.user.userId)
  );

  const results = await images;
  const numberOfResults = await Image.countDocuments(queryObject);

  res.status(200).json({ results, numberOfResults });
};

export const getOneImage = async (req, res) => {
  const { id } = req.params;
  const image = await Image.findOne({ _id: id });
  if (!image) {
    throw new NotFoundError(`Image with ID: ${id} not found`);
  }

  res.status(200).json({ image });
};

export const updateImage = async (req, res) => {
  const { id } = req.params;
  let { name, album, photo } = req.body;

  if (!name || !photo) {
    throw new BadRequestError("Please provide all the required values");
  }

  const image = await Image.findOne({ _id: id });

  if (!image) {
    throw new NotFoundError(`No job with ID: ${id} was found`);
  }

  if (req.user.userId !== image.creator.toString()) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }

  const updatedImage = await Image.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updatedImage });
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  const imageToDelete = await Image.findOne({ _id: id });

  if (!imageToDelete) {
    throw new NotFoundError(`Image with ID: ${id} not found`);
  }

  if (req.user.userId !== imageToDelete.creator.toString()) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }

  await imageToDelete.remove();
  res.status(200).json({ msg: "Image deleted successfully" });
};
