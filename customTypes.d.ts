declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_SERVICE_ROLE_KEY: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_TEMP_SUPABASE_SERVICE_ROLE_KEY: string;
    TWILIO_LIVE_SID: string;
    TWILIO_LIVE_AUTH_TOKEN: string;
    TWILIO_TEST_SID: string;
    TWILIO_TEST_AUTH_TOKEN: string;
  }
}
