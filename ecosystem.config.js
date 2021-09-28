module.exports = {
    apps : [
        {
            name       : 'Storage',
            script     : './dist/server',
            
            instances  : 2,                                             // Chạy 1 cluster web server
            exec_mode  : 'cluster',

            env: {
                'NODE_ENV': 'production',
                'PORT': 8080
            },
            env_development: {
                'NODE_ENV': 'development',
                'PORT': 8080
            },
            env_localhost: {
                'NODE_ENV': 'localhost',
                'PORT': 8080
            },
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            error_file: './log/webserver_error.log',
            out_file: './log/webserver_out.log'
        }
    ],
    deploy : {
        pro : {
            // ssh-copy-id -i ~/.ssh/id_rsa.pub root@45.117.170.218
            key  : '~/.ssh/id_rsa',
            user : 'root',
            host : 'host',
            ref  : 'origin/master',
            repo : 'git@repo.git',
            path : '/home/deploy/SkyStudioConference/production',
            'post-deploy' : 'npm install && npm run doc:api && npm run build && pm2 startOrGracefulReload ecosystem.config.js'
        }
    }
};