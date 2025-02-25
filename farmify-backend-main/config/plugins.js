module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("djwmaxkh8"),
        api_key: env("882638867727753"),
        api_secret: env("ZN6Zh3yyzGRhri7sn75WRDq7WCA"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
