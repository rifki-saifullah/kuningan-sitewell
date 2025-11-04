export type CreateCronJobRequest = {
    name: string;
    telegram_chat_id: string;
    cron_schedule_id: number;
}

export type UpdateCronJobRequest = {
    cron_schedule_id: number;
}

export type CreateCronScheduleRequest = {
    schedule: string;
    description: string;
}

export type CronJobResponse = {
    id: number;
    name: string;
    telegram_chat_id: string;
    cron_schedule_id: number;
    created_at: Date;
    updated_at: Date;
}

export type cronScheduleResponse = {
    id: number;
    schedule: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}
export type CronJobWithScheduleResponse =  {
    id: number;
    name: string;
    telegram_chat_id: string;
    cron_schedule_id: number;
    created_at: Date;
    updated_at: Date;
    cron_schedule: cronScheduleResponse;
};