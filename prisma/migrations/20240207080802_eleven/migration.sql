-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
