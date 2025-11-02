'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Layout from './Layout';
import { getPersonDetails, getPersonCredits } from '../utils/tmdbApi';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';
import { BsImage, BsArrowLeft } from 'react-icons/bs';

interface PersonProfileProps {
  personId: number;
}

interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
  popularity: number;
}

interface PersonCredit {
  id: number;
  title?: string;
  name?: string;
  character?: string;
  job?: string;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
  poster_path?: string;
}

function PersonProfile({ personId }: PersonProfileProps) {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();

  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [credits, setCredits] = useState<PersonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchPersonData();
  }, [personId]);

  const fetchPersonData = async () => {
    try {
      setLoading(true);

      // Fetch person details and credits in parallel
      const [personData, creditsData] = await Promise.all([
        getPersonDetails(personId),
        getPersonCredits(personId)
      ]);

      setPerson(personData);

      // Combine and sort credits by release date (most recent first)
      const allCredits = [
        ...(creditsData.cast || []),
        ...(creditsData.crew || [])
      ].sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || '1900-01-01');
        const dateB = new Date(b.release_date || b.first_air_date || '1900-01-01');
        return dateB.getTime() - dateA.getTime();
      });

      // Remove duplicates and limit to 20 most recent
      const uniqueCredits = allCredits
        .filter((credit, index, self) =>
          index === self.findIndex(c => c.id === credit.id && c.media_type === credit.media_type)
        )
        .slice(0, 20);

      setCredits(uniqueCredits);
    } catch (error) {
      console.error('Error fetching person data:', error);
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCreditClick = (credit: PersonCredit) => {
    const mediaType = credit.media_type;
    const id = credit.id;
    router.push(`/${mediaType}/${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-400">Loading person profile...</div>
        </div>
      </Layout>
    );
  }

  if (!person) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-400">Person not found</div>
        </div>
      </Layout>
    );
  }

  const hasValidProfileImage = person.profile_path && person.profile_path.trim() !== '';
  const profileImageSrc = hasValidProfileImage
    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person.profile_path}`
    : null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Layout>
      <div className="min-h-screen text-white p-6">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <BsArrowLeft className="text-xl" />
          <span>Back</span>
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                {profileImageSrc && !imageError ? (
                  <Image
                    src={profileImageSrc}
                    alt={person.name}
                    width={256}
                    height={384}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <BsImage className="text-gray-400 text-4xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Person Details */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{person.name}</h1>
                <p className="text-gray-400 text-lg">{person.known_for_department}</p>
              </div>

              {/* Biography */}
              {person.biography && (
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Biography</h2>
                  <p className="text-gray-300 leading-relaxed">{person.biography}</p>
                </div>
              )}

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {person.birthday && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Born</h3>
                    <p className="text-gray-300">
                      {new Date(person.birthday).toLocaleDateString()}
                      {person.place_of_birth && ` in ${person.place_of_birth}`}
                    </p>
                  </div>
                )}

                {person.deathday && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Died</h3>
                    <p className="text-gray-300">
                      {new Date(person.deathday).toLocaleDateString()}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold mb-1">Popularity</h3>
                  <p className="text-gray-300">{person.popularity.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filmography */}
          {credits.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Known For</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {credits.map((credit) => {
                  const title = credit.title || credit.name;
                  const hasValidPoster = credit.poster_path && credit.poster_path.trim() !== '';
                  const posterSrc = hasValidPoster
                    ? `https://www.themoviedb.org/t/p/w200${credit.poster_path}`
                    : null;

                  return (
                    <div
                      key={`${credit.id}-${credit.media_type}`}
                      onClick={() => handleCreditClick(credit)}
                      className="cursor-pointer group"
                    >
                      <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg mb-2 bg-gray-800">
                        {posterSrc ? (
                          <Image
                            src={posterSrc}
                            alt={title || 'Poster'}
                            width={200}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BsImage className="text-gray-400 text-2xl" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {title}
                        </h3>
                        {credit.character && (
                          <p className="text-xs text-gray-400">as {credit.character}</p>
                        )}
                        {credit.job && (
                          <p className="text-xs text-gray-400">{credit.job}</p>
                        )}
                        <p className="text-xs text-gray-500 uppercase">
                          {credit.media_type === 'movie' ? 'Movie' : 'TV Show'}
                          {credit.release_date && (
                            <> • {new Date(credit.release_date).getFullYear()}</>
                          )}
                          {credit.first_air_date && (
                            <> • {new Date(credit.first_air_date).getFullYear()}</>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default PersonProfile;
