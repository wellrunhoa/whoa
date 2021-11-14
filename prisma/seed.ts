import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.community.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.communityAmenity.deleteMany();

  console.log('Seeding...');

  const amenity1 = {
    amenityName: 'Swimming Pool',
    reservationAllowed: 'Y',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const amenity2 = {
    amenityName: 'Tennis Court',
    reservationAllowed: 'Y',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const amenity3 = {
    amenityName: 'Community Center',
    reservationAllowed: 'Y',
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };

  const ca1 = {
    amenity: { create: amenity1 },
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const ca2 = {
    amenity: { create: amenity2 },
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };
  const ca3 = {
    amenity: { create: amenity3 },
    createdBy: '12321-123',
    createdAt: new Date(),
    updatedBy: '12321-123',
    updatedAt: new Date()
  };

  const community1 = await prisma.community.create({
    data: {
      name: 'ABC Community',
      addressLine1: '123 W 13th St',
      city: 'City',
      state: 'State',
      zipCode: '223903',
      createdBy: '12321-123',
      createdAt: new Date(),
      updatedBy: '12321-123',
      updatedAt: new Date(),
      amenities: {
        create: [ca1, ca2, ca3]
      }
    }
  });

  console.log({ community1 });
}

main()
  .then(() => console.log('Goodbye from seed.js'))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
