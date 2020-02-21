const jwtKeySecret = () => {
  const secretKeyIs = process.env.JWT_KEY_SECRET;
  if (!secretKeyIs) {
    throw new Error('bad secret');
  }
  return secretKeyIs;
};

module.exports = { jwtKeySecret };
