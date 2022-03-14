-- CreateTable
CREATE TABLE "LikedMovies" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "LikedMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DislikedMovies" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "DislikedMovies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LikedMovies" ADD CONSTRAINT "LikedMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikedMovies" ADD CONSTRAINT "DislikedMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
