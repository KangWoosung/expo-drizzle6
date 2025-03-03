// 음악 관련 상수 정의
export enum Genre {
  POP = "POP",
  ROCK = "ROCK",
  HIPHOP = "HIPHOP",
  RNB = "R&B",
  JAZZ = "JAZZ",
  CLASSICAL = "CLASSICAL",
  ELECTRONIC = "ELECTRONIC",
  COUNTRY = "COUNTRY",
  FOLK = "FOLK",
  BLUES = "BLUES",
  METAL = "METAL",
  REGGAE = "REGGAE",
  KPOP = "KPOP",
}

export enum PreferredDevice {
  PHONE = "PHONE",
  COMPUTER = "COMPUTER",
  TABLET = "TABLET",
  SPEAKER = "SPEAKER",
  HEADPHONES = "HEADPHONES",
  EARBUDS = "EARBUDS",
}

export enum MoodBasedChoices {
  HAPPY = "HAPPY",
  SAD = "SAD",
  ENERGETIC = "ENERGETIC",
  CALM = "CALM",
  ROMANTIC = "ROMANTIC",
  FOCUSED = "FOCUSED",
  RELAXED = "RELAXED",
  NOSTALGIC = "NOSTALGIC",
  MELANCHOLIC = "MELANCHOLIC",
  SLEEPY = "SLEEPY",
}

export enum Frequency {
  DAILY = "daily",
  SEVERAL_TIMES_A_WEEK = "Several times a week",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  RARELY = "Rarely",
}

export enum Instruments {
  GUITAR = "guitar",
  PIANO = "piano",
  DRUMS = "drums",
  VIOLIN = "Violin",
  BASS = "Bass",
  SAXOPHONE = "Saxophone",
  FLUTE = "Flute",
  TRUMPET = "Trumpet",
  VOCALS = "Vocals",
}

export enum SkillLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  PROFESSIONAL = "Professional",
}

export const genreList = Object.entries(Genre).map(
  ([key, value]: [string, Genre]) => {
    return {
      key,
      value,
    };
  }
);

export const preferredDeviceList = Object.entries(PreferredDevice).map(
  ([key, value]: [string, PreferredDevice]) => {
    return {
      key,
      value,
    };
  }
);
