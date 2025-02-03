const {withSentryConfig}=require("@sentry/nextjs")

const modulExports ={

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
          },
        ],
      },
};
const SentryWebpackPluginOptions = {
    silent:true,//suppress all logs
};

module.exports=withSentryConfig(modulExports,SentryWebpackPluginOptions)

