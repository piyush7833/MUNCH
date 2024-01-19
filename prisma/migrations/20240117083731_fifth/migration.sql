-- CreateTable
CREATE TABLE "ShopOwner" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "panCard" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "IFSC" TEXT NOT NULL,
    "aadhar" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "GSTIN" TEXT NOT NULL,

    CONSTRAINT "ShopOwner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShopOwner" ADD CONSTRAINT "ShopOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
